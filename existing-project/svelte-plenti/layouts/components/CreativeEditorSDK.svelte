<!-- layouts/components/CreativeEditorSDK.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import CreativeEditorSDK from '/vendor/cesdk.mjs';

  // ✅ props Svelte 3 (pas de $props())
  export let config = {};

  // refs
  let container;
  let cesdk = null;

  // ✅ config par défaut (ajoute bien baseURL)
  const defaultConfig = {
    license: '<YOUR_LICENSE_KEY>',
    baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.57.0/assets',
    callbacks: { onUpload: 'local' }
  };

  onMount(async () => {
    try {
      const ceSDKConfig = { ...defaultConfig, ...config };
      cesdk = await CreativeEditorSDK.create(container, ceSDKConfig);

      await Promise.all([
        cesdk.addDefaultAssetSources(),
        cesdk.addDemoAssetSources({ sceneMode: 'Design' })
      ]);
      await cesdk.createDesignScene();
    } catch (err) {
      console.warn('CreativeEditor SDK failed to mount.', err);
    }
  });

  onDestroy(() => {
    try { cesdk?.dispose(); } catch (err) {
      console.warn('CreativeEditor SDK failed to unmount.', err);
    }
    cesdk = null;
  });
</script>

<!-- ⚠️ pas de guillemets autour de {container} -->
<div id="cesdk_container" bind:this={container}></div>

<style>
  #cesdk_container { height: 100vh; width: 100vw; }
</style>
