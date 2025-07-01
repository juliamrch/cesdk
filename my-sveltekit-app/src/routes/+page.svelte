<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<script>
    // other imports...
  
    import { browser } from "$app/environment"; // true only if the app is running in the browser
    // use the browser flag to conditionally render client-side components
    let isClient = browser;
  
    let CreativeEditorSDK = null;
    if (isClient) {
      // dynamically import the CreativeEditorSDK component only in the browser
      import("$lib").then(module => {
        CreativeEditorSDK = module.CreativeEditorSDK;
      });
    }
  </script>
  
  <main>
    <!-- other components... -->
    {#if isClient && CreativeEditorSDK}
      <CreativeEditorSDK
        config={{
          // custom configs...
        }}
      />
    {/if}
    <!-- other components... -->
  </main>
  
  <style>
    /* custom styling... */
  </style>