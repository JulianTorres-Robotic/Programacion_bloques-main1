# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

# 1. AQUÍ METEMOS TUS CARPETAS DENTRO DEL EXE
# Asegúrate de que estas carpetas existan en tu proyecto
added_files = [
    ('ardublockly', 'ardublockly'),
    ('blocks', 'blocks'),
    ('blockly', 'blockly'),
    #('msg', 'msg'),
    ('arduino-1.8.19', 'arduino-1.8.19'),
]

a = Analysis(
    ['start.py'],
    pathex=[],
    binaries=[],
    datas=added_files, 
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='MarkRobot_Blockly',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False, # ESTO OCULTA LA PANTALLA NEGRA
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)