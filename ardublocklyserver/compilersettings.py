# -*- coding: utf-8 -*-
"""Save and retrieve the compiler settings into a text file.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0

The ServerCompilerSettings is a singleton class maintained in memory, and
the the Ardublockly and Arduino IDE settings into a file.
On first invocation of the singleton it reads the settings from the file.
"""
from __future__ import unicode_literals, absolute_import, print_function
import os
import re
import sys
import codecs
from pathlib import Path
import configparser
import ardublocklyserver.serialport


class ServerCompilerSettings(object):
    """Singleton class to store and save the Ardublockly settings."""

    __singleton_instance = None
    __settings_path = None
    __settings_filename = 'ServerCompilerSettings.ini'

    __arduino_types = {
        'Uno': 'arduino:avr:uno',
        'Nano 328': 'arduino:avr:nano:cpu=atmega328',
        'Nano 168': 'arduino:avr:nano:cpu=atmega168',
        'Leonardo': 'arduino:avr:leonardo',
        'Yun': 'arduino:avr:leonardo',
        'Mega': 'arduino:avr:mega',
        'Duemilanove 328p': 'arduino:avr:diecimila',
        'Duemilanove 168p': 'arduino:avr:diecimila:cpu=atmega168',
        'Atmel atmega328p Xplained mini': 'atmel:avr:atmega328p_xplained_mini',
        'Atmel atmega168pb Xplained mini': 'atmel:avr:atmega168pb_xplained_mini',
        'Atmel atmega328pb Xplained mini': 'atmel:avr:atmega328pb_xplained_mini',
        'ESP8266 Huzzah': 'esp8266:esp8266:generic',
        'ESP8266 WeMos D1': 'esp8266:esp8266:generic',
        'ESP32 Dev Module': 'esp32:esp32:esp32:UploadSpeed=921600,PartitionScheme=default,FlashMode=qio,CPUFreq=240,FlashFreq=80',
        'ESP32 WROOM-32': 'esp32:esp32:esp32:UploadSpeed=921600,PartitionScheme=default,FlashMode=qio,CPUFreq=240,FlashFreq=80',
    }

    __serial_ports = {'port0': 'COM1'}

    __ide_load_options = {
        'open': 'Open sketch in IDE',
        'verify': 'Verify sketch',
        'upload': 'Compile and Upload sketch',
    }

    def __new__(cls, settings_dir=None, *args, **kwargs):
        if not cls.__singleton_instance:
            cls.__singleton_instance = super(ServerCompilerSettings, cls).__new__(
                cls, *args, **kwargs
            )
            cls.__singleton_instance.__initialise(settings_dir)
        return cls.__singleton_instance

    def __initialise(self, settings_dir=None):
        # Campos internos
        self.__load_ide_option = None
        self.__compiler_dir = None
        self.__sketch_dir = None
        self.__sketch_name = None
        self.__arduino_board_key = None
        self.__arduino_board_value = None
        self.__serial_port_key = None
        self.__serial_port_value = None

        # Ruta del archivo de settings
        if settings_dir:
            # start.py te pasa el directorio ardublockly como settings_dir
            self.__settings_path = os.path.join(settings_dir, self.__settings_filename)
        else:
            if getattr(sys, 'frozen', False):
                if hasattr(sys, '_MEIPASS'):
                    base_path = Path(sys._MEIPASS)
                else:
                    base_path = Path(sys.executable).parent
            else:
                base_path = Path(__file__).resolve().parent.parent

            self.__settings_path = os.path.join(
                base_path, 'ardublockly', self.__settings_filename
            )

        self.read_settings()

    @classmethod
    def _drop(cls):
        cls.__singleton_instance = None

    # -------------------------------------------------------------------------
    # Compiler (Arduino IDE)
    # -------------------------------------------------------------------------
    def get_compiler_dir(self):
        return self.__compiler_dir

    def set_compiler_dir(self, new_compiler_dir):
        """Setter explícito (por si algún día se configura desde UI)."""
        # Caso especial macOS (no lo usas ahora, pero se deja por compatibilidad)
        if sys.platform == 'darwin' and os.path.isdir(new_compiler_dir):
            bundle = os.path.join(new_compiler_dir, 'Contents', 'MacOS')
            if os.path.isfile(os.path.join(bundle, 'JavaApplicationStub')):
                new_compiler_dir = os.path.join(bundle, 'JavaApplicationStub')
            elif os.path.isfile(os.path.join(bundle, 'Arduino')):
                new_compiler_dir = os.path.join(bundle, 'Arduino')

        if os.path.isfile(new_compiler_dir):
            self.__compiler_dir = new_compiler_dir
            self.save_settings()
        else:
            if not self.__compiler_dir:
                self.set_compiler_dir_default()
                self.save_settings()

    compiler_dir = property(get_compiler_dir, set_compiler_dir)

    def set_compiler_dir_default(self):
        """
        Intenta encontrar el ejecutable del Arduino IDE.

        1) Primero usa la variable de entorno ARDUINO_IDE_PATH
           (la que seteas en start.py con resource_path('arduino-1.8.19')).
        2) Si no existe, intenta con la ruta base del proyecto/_MEIPASS.
        """
        try:
            candidates = []

            # 1) Priorizar lo que definimos en start.py
            ide_root_env = os.environ.get('ARDUINO_IDE_PATH')
            if ide_root_env:
                ide_root = Path(ide_root_env)
                candidates.append(ide_root / 'arduino_debug.exe')
                candidates.append(ide_root / 'arduino.exe')

            # 2) Fallback: buscar relativo al propio código / _MEIPASS
            if getattr(sys, 'frozen', False):
                if hasattr(sys, '_MEIPASS'):
                    base_path = Path(sys._MEIPASS)
                else:
                    base_path = Path(sys.executable).parent
            else:
                base_path = Path(__file__).resolve().parent.parent

            candidates.append(base_path / 'arduino-1.8.19' / 'arduino_debug.exe')
            candidates.append(base_path / 'arduino-1.8.19' / 'arduino.exe')

            # Buscar el primero que exista
            self.__compiler_dir = None
            for p in candidates:
                if p.is_file():
                    self.__compiler_dir = str(p)
                    break

            if self.__compiler_dir:
                print('✔ Arduino IDE encontrado en:\n\t%s' % self.__compiler_dir)
            else:
                print('❌ No se encontró el ejecutable de Arduino IDE.')
                print('   Revisar carpeta "arduino-1.8.19" en el mismo nivel que start.py/start.exe.')

        except Exception as e:
            self.__compiler_dir = None
            print('❌ Error en set_compiler_dir_default:', e)

        sys.stdout.flush()

    def set_compiler_dir_from_file(self, new_compiler_dir):
        if new_compiler_dir and os.path.exists(new_compiler_dir):
            self.__compiler_dir = new_compiler_dir
        else:
            self.set_compiler_dir_default()

    # -------------------------------------------------------------------------
    # Sketch name & directory
    # -------------------------------------------------------------------------
    def get_sketch_name(self):
        return self.__sketch_name

    def set_sketch_name(self, new_sketch_name):
        if re.match(r"^[\w\d_-]*$", new_sketch_name):
            self.__sketch_name = new_sketch_name
            self.save_settings()
        else:
            if not self.__sketch_name:
                self.set_sketch_name_default()
                self.save_settings()

    sketch_name = property(get_sketch_name, set_sketch_name)

    def set_sketch_name_default(self):
        self.__sketch_name = 'ArdublocklySketch'

    def set_sketch_name_from_file(self, new_sketch_name):
        if re.match(r"^[\w\d_-]*$", new_sketch_name):
            self.__sketch_name = new_sketch_name
        else:
            self.set_sketch_name_default()

    def get_sketch_dir(self):
        return self.__sketch_dir

    def set_sketch_dir(self, new_sketch_dir):
        if os.path.isdir(new_sketch_dir):
            self.__sketch_dir = new_sketch_dir
            self.save_settings()
        else:
            if not self.__sketch_dir:
                self.set_sketch_dir_default()
                self.save_settings()

    sketch_dir = property(get_sketch_dir, set_sketch_dir)

    def set_sketch_dir_default(self):
        try:
            if getattr(sys, 'frozen', False):
                if hasattr(sys, '_MEIPASS'):
                    base_path = Path(sys._MEIPASS)
                else:
                    base_path = Path(sys.executable).parent
            else:
                base_path = Path(__file__).resolve().parent.parent

            possible_paths = [
                base_path / 'ArdublocklySketch',
                base_path / 'sketch',
            ]

            for path in possible_paths:
                if path.exists() and path.is_dir():
                    self.__sketch_dir = str(path)
                    return

            import tempfile
            self.__sketch_dir = tempfile.mkdtemp(prefix='ardublockly_sketch_')

        except Exception:
            import tempfile
            self.__sketch_dir = tempfile.mkdtemp(prefix='ardublockly_sketch_')

    def set_sketch_dir_from_file(self, new_sketch_dir):
        if os.path.isdir(new_sketch_dir):
            self.__sketch_dir = new_sketch_dir
        else:
            self.set_sketch_dir_default()

    # -------------------------------------------------------------------------
    # Arduino board
    # -------------------------------------------------------------------------
    def get_arduino_board(self):
        return self.__arduino_board_key

    def set_arduino_board(self, new_board):
        if new_board in self.__arduino_types:
            self.__arduino_board_value = self.__arduino_types[new_board]
            self.__arduino_board_key = new_board
            self.save_settings()
        else:
            if not (self.__arduino_board_key and self.__arduino_board_value):
                self.set_arduino_board_default()
                self.save_settings()

    arduino_board = property(get_arduino_board, set_arduino_board)

    def set_arduino_board_default(self):
        self.__arduino_board_key = sorted(self.__arduino_types.keys())[0]
        self.__arduino_board_value = self.__arduino_types[self.__arduino_board_key]

    def set_arduino_board_from_file(self, new_board):
        if new_board in self.__arduino_types:
            self.__arduino_board_value = self.__arduino_types[new_board]
            self.__arduino_board_key = new_board
        else:
            self.set_arduino_board_default()

    def get_arduino_board_flag(self):
        return self.__arduino_board_value

    def get_arduino_board_types(self):
        return [key for key in self.__arduino_types]

    # -------------------------------------------------------------------------
    # Serial ports
    # -------------------------------------------------------------------------
    def get_serial_port(self):
        self.populate_serial_port_list()
        if not self.__serial_ports:
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_port_value not in self.__serial_ports.values():
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_ports.get(self.__serial_port_key) != self.__serial_port_value:
            for key, value in self.__serial_ports.items():
                if self.__serial_port_value == value:
                    self.__serial_port_key = key
        return self.__serial_port_key

    def set_serial_port(self, new_port):
        if new_port in self.__serial_ports:
            self.__serial_port_value = self.__serial_ports[new_port]
            self.__serial_port_key = new_port
            self.populate_serial_port_list()
            if not self.__serial_ports:
                self.__serial_port_key = None
                self.__serial_port_value = None
            elif self.__serial_port_value not in self.__serial_ports.values():
                self.__serial_port_key = None
                self.__serial_port_value = None
            self.save_settings()
        else:
            if not (self.__serial_port_key and self.__serial_port_value):
                self.set_serial_port_default()
                self.save_settings()

    serial_port = property(get_serial_port, set_serial_port)

    def set_serial_port_default(self):
        self.populate_serial_port_list()
        if not self.__serial_ports:
            self.__serial_port_key = None
            self.__serial_port_value = None
        else:
            self.__serial_port_key = sorted(self.__serial_ports.keys())[0]
            self.__serial_port_value = self.__serial_ports[self.__serial_port_key]

    def set_serial_port_from_file(self, new_port_value):
        set_default = True
        self.populate_serial_port_list()
        if self.__serial_ports:
            for key, value in self.__serial_ports.items():
                if new_port_value == value:
                    self.__serial_port_key = key
                    self.__serial_port_value = value
                    set_default = False
        if set_default:
            self.set_serial_port_default()

    def get_serial_port_flag(self):
        self.populate_serial_port_list()
        if not self.__serial_ports:
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_port_value not in self.__serial_ports.values():
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_ports.get(self.__serial_port_key) != self.__serial_port_value:
            for key, value in self.__serial_ports.items():
                if self.__serial_port_value == value:
                    self.__serial_port_key = key
        return self.__serial_port_value

    def get_serial_ports(self):
        self.populate_serial_port_list()
        return self.__serial_ports

    def populate_serial_port_list(self):
        port_list = ardublocklyserver.serialport.get_port_list()
        self.__serial_ports = {}
        if port_list:
            port_id = 0
            for item in port_list:
                id_string = 'port' + str(port_id)
                self.__serial_ports.update({id_string: item})
                port_id += 1

    # -------------------------------------------------------------------------
    # IDE load option
    # -------------------------------------------------------------------------
    def get_load_ide(self):
        return self.__load_ide_option

    def set_load_ide(self, new_load_option):
        if new_load_option in self.__ide_load_options:
            self.__load_ide_option = new_load_option
            self.save_settings()
        else:
            if not self.__load_ide_option:
                self.set_load_ide_default()
                self.save_settings()

    load_ide_option = property(get_load_ide, set_load_ide)

    def set_load_ide_default(self):
        self.__load_ide_option = sorted(self.__ide_load_options.keys())[0]

    def set_load_ide_from_file(self, new_load_option):
        if new_load_option in self.__ide_load_options:
            self.__load_ide_option = new_load_option
        else:
            self.set_load_ide_default()

    def get_load_ide_options(self):
        return self.__ide_load_options

    # -------------------------------------------------------------------------
    # Defaults / Settings file
    # -------------------------------------------------------------------------
    def set_default_settings(self):
        self.set_load_ide_default()
        self.set_compiler_dir_default()
        self.set_sketch_dir_default()
        self.set_sketch_name_default()
        self.set_serial_port_default()
        self.set_arduino_board_default()

    def save_settings(self):
        settings_parser = configparser.ConfigParser()

        # Arduino IDE
        settings_parser.add_section('Arduino_IDE')
        arduino_exec_path = self.__compiler_dir or ''
        arduino_board = self.__arduino_board_key or ''
        arduino_serial = self.__serial_port_value or ''
        settings_parser.set('Arduino_IDE', 'arduino_exec_path', '%s' % arduino_exec_path)
        settings_parser.set('Arduino_IDE', 'arduino_board', '%s' % arduino_board)
        settings_parser.set('Arduino_IDE', 'arduino_serial_port', '%s' % arduino_serial)

        # Sketch
        settings_parser.add_section('Arduino_Sketch')
        sketch_name = self.__sketch_name or ''
        sketch_dir = self.__sketch_dir or ''
        settings_parser.set('Arduino_Sketch', 'sketch_name', '%s' % sketch_name)
        settings_parser.set('Arduino_Sketch', 'sketch_directory', '%s' % sketch_dir)

        # Ardublockly
        settings_parser.add_section('Ardublockly')
        ide_load = self.__load_ide_option or ''
        settings_parser.set('Ardublockly', 'ide_load', '%s' % ide_load)

        try:
            with codecs.open(self.__settings_path, 'wb+', encoding='utf-8') as config_file:
                settings_parser.write(config_file)
        except Exception as e:
            print('%s\nUnable to write the settings file to:\n\t%s' %
                  (self.__settings_path, str(e)))
        else:
            print('Settings file saved to:\n\t%s' % self.__settings_path)
        sys.stdout.flush()

    def read_settings(self):
        settings_dict = self.get_settings_file_data()
        if settings_dict:
            self.set_compiler_dir_from_file(settings_dict['arduino_exec_path'])
            self.set_arduino_board_from_file(settings_dict['arduino_board'])
            self.set_serial_port_from_file(settings_dict['arduino_serial_port'])
            self.set_sketch_name_from_file(settings_dict['sketch_name'])
            self.set_sketch_dir_from_file(settings_dict['sketch_directory'])
            self.set_load_ide_from_file(settings_dict['ide_load'])
        else:
            self.set_default_settings()
        self.save_settings()

    def get_settings_file_data(self):
        settings_dict = {}
        settings_parser = configparser.ConfigParser()
        try:
            with codecs.open(self.__settings_path, 'r', 'utf8') as config_file:
                settings_parser.read_file(config_file)

            settings_dict['arduino_exec_path'] = settings_parser.get('Arduino_IDE', 'arduino_exec_path')
            settings_dict['arduino_board'] = settings_parser.get('Arduino_IDE', 'arduino_board')
            settings_dict['arduino_serial_port'] = settings_parser.get('Arduino_IDE', 'arduino_serial_port')
            settings_dict['sketch_name'] = settings_parser.get('Arduino_Sketch', 'sketch_name')
            settings_dict['sketch_directory'] = settings_parser.get('Arduino_Sketch', 'sketch_directory')
            settings_dict['ide_load'] = settings_parser.get('Ardublockly', 'ide_load')
        except Exception:
            settings_dict = None
        return settings_dict

    def get_settings_file_path(self):
        return self.__settings_path

    def delete_settings_file(self):
        success = False
        if os.path.exists(self.__settings_path):
            os.remove(self.__settings_path)
            success = True
        return success
