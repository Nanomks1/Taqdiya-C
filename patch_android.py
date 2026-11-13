import glob, os, re, shutil

main = glob.glob('android/app/src/main/java/**/MainActivity.java', recursive=True)[0]
shutil.copy('native/AllFilesPlugin.java', os.path.dirname(main))

s = open(main, encoding='utf-8').read()
if 'registerPlugin' not in s:
    s = re.sub(
        r'public class MainActivity extends BridgeActivity\s*\{\s*\}',
        'public class MainActivity extends BridgeActivity {\n'
        '    @Override\n'
        '    public void onCreate(android.os.Bundle savedInstanceState) {\n'
        '        registerPlugin(AllFilesPlugin.class);\n'
        '        super.onCreate(savedInstanceState);\n'
        '    }\n'
        '}',
        s,
    )
    assert 'registerPlugin' in s, 'MainActivity patch failed'
    open(main, 'w', encoding='utf-8').write(s)

mf = 'android/app/src/main/AndroidManifest.xml'
x = open(mf, encoding='utf-8').read()
if 'MANAGE_EXTERNAL_STORAGE' not in x:
    x = x.replace('<application', '<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />\n    <application', 1)
    assert 'MANAGE_EXTERNAL_STORAGE' in x, 'Manifest patch failed'
    open(mf, 'w', encoding='utf-8').write(x)
print('native patches ok')
