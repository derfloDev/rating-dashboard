import { Injectable } from '@angular/core';
declare var Quagga: any;

@Injectable({
  providedIn: 'root',
})
export class BarcodeService {
  private mediaDevicesSupported: boolean = false;
  constructor() {
    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    ) {
      this.mediaDevicesSupported = true;
    } else {
      this.mediaDevicesSupported = false;
    }
  }

  init(selector: string): void {
    if (this.mediaDevicesSupported === true) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector(selector), // Or '#yourElement' (optional)
          },
          decoder: {
            readers: ['code_128_reader'],
          },
        },
        function (err: any) {
          if (!err) {
            console.log(err);
            return;
          }
          console.log('Initialization finished. Ready to start');
          Quagga.start();
          Quagga.onDetected((data: any) => {
            if (data.codeResult) {
              console.log('onDetected');
              console.log(data);
              alert(data);
            }
          });
          Quagga.onProcessed((data: any) => {
            if (data.codeResult) {
              console.log('onProcessed');
              console.log(data);
              alert(data);
            }
          });
        }
      );
    }
  }
}
