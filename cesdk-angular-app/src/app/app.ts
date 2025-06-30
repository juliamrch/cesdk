import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements AfterViewInit {
  @ViewChild('cesdk_container') containerRef!: ElementRef;

  title = 'Integrate CreativeEditor SDK with Angular';

  ngAfterViewInit(): void {
    const config: Configuration = {
      license: 'YOUR_LICENSE_KEY', // Replace with your actual CE.SDK license key
      baseURL:
        'https://cdn.img.ly/packages/imgly/cesdk-js/1.54.0/assets',
      callbacks: {
        onUpload: 'local',
      },
    };

    CreativeEditorSDK.create(this.containerRef.nativeElement, config).then(
      async (instance: any) => {
        instance.addDefaultAssetSources();
        instance.addDemoAssetSources({ sceneMode: 'Design' });
        await instance.createDesignScene();
      },
    );
  }
}
