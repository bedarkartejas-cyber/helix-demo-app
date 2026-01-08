import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getProducts: (personaId?: string) =>
    ipcRenderer.invoke('get-products', personaId),
});
