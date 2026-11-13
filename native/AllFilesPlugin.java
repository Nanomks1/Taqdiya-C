package az.pdr.taqdiya;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "AllFiles")
public class AllFilesPlugin extends Plugin {
    private static final String DIR = "/storage/emulated/0/_All/All Backups/Taqdiya";

    private boolean granted() {
        return Build.VERSION.SDK_INT < 30 || Environment.isExternalStorageManager();
    }

    private boolean badName(String n) {
        return n == null || n.isEmpty() || n.contains("/") || n.contains("..");
    }

    @PluginMethod
    public void status(PluginCall call) {
        JSObject r = new JSObject();
        r.put("granted", granted());
        r.put("dir", DIR);
        call.resolve(r);
    }

    @PluginMethod
    public void request(PluginCall call) {
        try {
            Intent i = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION,
                    Uri.parse("package:" + getContext().getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
        } catch (Exception e) {
            Intent i = new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
        }
        call.resolve();
    }

    @PluginMethod
    public void write(PluginCall call) {
        String name = call.getString("name");
        String data = call.getString("data");
        if (!granted()) { call.reject("no access"); return; }
        if (badName(name) || data == null) { call.reject("bad args"); return; }
        try {
            File dir = new File(DIR);
            dir.mkdirs();
            byte[] bytes = data.getBytes(StandardCharsets.UTF_8);
            File tmp = new File(dir, name + ".tmp");
            try (FileOutputStream o = new FileOutputStream(tmp)) {
                o.write(bytes);
                o.getFD().sync();
            }
            if (tmp.length() != bytes.length) { tmp.delete(); call.reject("verify failed"); return; }
            File dst = new File(dir, name);
            if (dst.exists()) dst.delete();
            if (!tmp.renameTo(dst)) { call.reject("rename failed"); return; }
            call.resolve();
        } catch (Exception e) {
            call.reject(String.valueOf(e.getMessage()));
        }
    }

    @PluginMethod
    public void list(PluginCall call) {
        if (!granted()) { call.reject("no access"); return; }
        JSArray arr = new JSArray();
        File[] fs = new File(DIR).listFiles();
        if (fs != null) {
            for (File f : fs) {
                if (!f.isFile() || f.getName().endsWith(".tmp")) continue;
                JSObject o = new JSObject();
                o.put("name", f.getName());
                o.put("size", f.length());
                o.put("mod", f.lastModified());
                arr.put(o);
            }
        }
        JSObject r = new JSObject();
        r.put("files", arr);
        call.resolve(r);
    }

    @PluginMethod
    public void read(PluginCall call) {
        String name = call.getString("name");
        if (!granted()) { call.reject("no access"); return; }
        if (badName(name)) { call.reject("bad args"); return; }
        try {
            File f = new File(DIR, name);
            byte[] b = new byte[(int) f.length()];
            try (FileInputStream in = new FileInputStream(f)) {
                int off = 0;
                while (off < b.length) {
                    int n = in.read(b, off, b.length - off);
                    if (n < 0) break;
                    off += n;
                }
            }
            JSObject r = new JSObject();
            r.put("data", new String(b, StandardCharsets.UTF_8));
            call.resolve(r);
        } catch (Exception e) {
            call.reject(String.valueOf(e.getMessage()));
        }
    }

    @PluginMethod
    public void remove(PluginCall call) {
        String name = call.getString("name");
        if (!granted()) { call.reject("no access"); return; }
        if (badName(name)) { call.reject("bad args"); return; }
        new File(DIR, name).delete();
        call.resolve();
    }
}
