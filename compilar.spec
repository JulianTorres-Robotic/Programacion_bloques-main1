# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

# --- PARTE IMPORTANTE: AQUÍ DEFINIMOS QUÉ CARPETAS INCLUIR ---
# Formato: ('carpeta_real_en_tu_pc', 'carpeta_destino_en_el_exe')
mis_archivos = [
    ('ardublockly', 'ardublockly'),
    ('blocks', 'blocks'),
    ('blockly', 'blockly'),
]
# -------------------------------------------------------------

a = Analysis(
    ['start.py'],
    pathex=[],
    binaries=[],
    datas=mis_archivos,  # Aquí inyectamos tus carpetas
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
    [],
    exclude_binaries=True,
    name='MarkRobot_Blockly',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True, # Dejamos la consola activada para ver errores si los hay
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

# ESTO CREARÁ UNA CARPETA (ONEDIR) EN LUGAR DE UN SOLO ARCHIVO
# Es mucho más fácil de arreglar si faltan cosas.
coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='MarkRobot_Blockly',
)