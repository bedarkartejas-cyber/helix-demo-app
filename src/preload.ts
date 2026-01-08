import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getProducts: (personaId?: string) =>
    ipcRenderer.invoke('get-products', personaId),
  getRecommendations: (answers: Record<string, string>) =>
    ipcRenderer.invoke('get-recommendations', answers),
});
