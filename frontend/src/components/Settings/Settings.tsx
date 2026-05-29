import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { Button, Card, Input } from '@/components/Common';
import { settingsAPI } from '@/services/api';
import { Key, Server } from 'lucide-react';
import toast from 'react-hot-toast';

interface TokenSettings {
  wpscan: string;
  dnsdumpster: string;
  mxtoolbox: string;
  apininja: string;
  intelx: string;
  gemini: string;
}

interface ProxySettings {
  enabled: boolean;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}

export const Settings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<TokenSettings>({
    wpscan: '',
    dnsdumpster: '',
    mxtoolbox: '',
    apininja: '',
    intelx: '',
    gemini: '',
  });
  const [proxy, setProxy] = useState<ProxySettings>({
    enabled: false,
    host: '',
    port: 8080,
    username: '',
    password: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const [
        wpscan,
        dnsdumpster,
        mxtoolbox,
        apininja,
        intelx,
        gemini,
        proxyConfig,
      ] = await Promise.all([
        settingsAPI.getWPScanToken(),
        settingsAPI.getDNSDumpsterToken(),
        settingsAPI.getMXToolBoxToken(),
        settingsAPI.getAPINinjaToken(),
        settingsAPI.getIntelXToken(),
        settingsAPI.getGeminiToken(),
        settingsAPI.getProxyConfig(),
      ]);

      setTokens({
        wpscan: wpscan.data.token,
        dnsdumpster: dnsdumpster.data.token,
        mxtoolbox: mxtoolbox.data.token,
        apininja: apininja.data.token,
        intelx: intelx.data.token,
        gemini: gemini.data.token,
      });

      setProxy(proxyConfig.data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleTokenChange = async (key: keyof TokenSettings, value: string) => {
    setTokens({ ...tokens, [key]: value });
  };

  const saveToken = async (key: keyof TokenSettings) => {
    try {
      const tokenValue = tokens[key];
      switch (key) {
        case 'wpscan':
          await settingsAPI.setWPScanToken(tokenValue);
          break;
        case 'dnsdumpster':
          await settingsAPI.setDNSDumpsterToken(tokenValue);
          break;
        case 'mxtoolbox':
          await settingsAPI.setMXToolBoxToken(tokenValue);
          break;
        case 'apininja':
          await settingsAPI.setAPINinjaToken(tokenValue);
          break;
        case 'intelx':
          await settingsAPI.setIntelXToken(tokenValue);
          break;
        case 'gemini':
          await settingsAPI.setGeminiToken(tokenValue);
          break;
      }
      toast.success(`${key} token saved`);
    } catch (error) {
      console.error('Failed to save token:', error);
      toast.error('Failed to save token');
    }
  };

  const saveProxy = async () => {
    try {
      await settingsAPI.setProxyConfig(proxy);
      toast.success('Proxy settings saved');
    } catch (error) {
      console.error('Failed to save proxy settings:', error);
      toast.error('Failed to save proxy settings');
    }
  };

  if (loading) {
    return (
      <Layout pageTitle="Settings">
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-400">Loading settings...</p>
        </div>
      </Layout>
    );
  }

  const tokenList = [
    { key: 'wpscan' as const, label: 'WPScan API Token' },
    { key: 'dnsdumpster' as const, label: 'DNSDumpster Token' },
    { key: 'mxtoolbox' as const, label: 'MX ToolBox Token' },
    { key: 'apininja' as const, label: 'API Ninja Token' },
    { key: 'intelx' as const, label: 'IntelligenceX Token' },
    { key: 'gemini' as const, label: 'Gemini API Token' },
  ];

  return (
    <Layout pageTitle="Settings">
      <div className="space-y-8 max-w-4xl">
        {/* API Tokens Section */}
        <Card>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <Key className="h-6 w-6" />
            API Tokens
          </h3>
          <div className="space-y-4">
            {tokenList.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-2 md:flex-row md:items-end">
                <div className="flex-1">
                  <Input
                    label={label}
                    type="password"
                    value={tokens[key]}
                    onChange={(e) => handleTokenChange(key, e.target.value)}
                    placeholder={`Enter ${label}`}
                  />
                </div>
                <Button
                  size="sm"
                  onClick={() => saveToken(key)}
                  className="self-start md:self-auto"
                >
                  Save
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Proxy Configuration Section */}
        <Card>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <Server className="h-6 w-6" />
            Proxy Configuration
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={proxy.enabled}
                onChange={(e) =>
                  setProxy({ ...proxy, enabled: e.target.checked })
                }
                className="h-4 w-4"
              />
              <span className="text-sm font-medium">Enable Proxy</span>
            </label>

            {proxy.enabled && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Host"
                  value={proxy.host}
                  onChange={(e) =>
                    setProxy({ ...proxy, host: e.target.value })
                  }
                  placeholder="127.0.0.1"
                />
                <Input
                  label="Port"
                  type="number"
                  value={proxy.port}
                  onChange={(e) =>
                    setProxy({ ...proxy, port: parseInt(e.target.value) })
                  }
                  placeholder="8080"
                />
                <Input
                  label="Username"
                  value={proxy.username}
                  onChange={(e) =>
                    setProxy({ ...proxy, username: e.target.value })
                  }
                  placeholder="Optional"
                />
                <Input
                  label="Password"
                  type="password"
                  value={proxy.password}
                  onChange={(e) =>
                    setProxy({ ...proxy, password: e.target.value })
                  }
                  placeholder="Optional"
                />
              </div>
            )}

            <Button onClick={saveProxy}>Save Proxy Settings</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
