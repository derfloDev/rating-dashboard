import { Injectable } from '@angular/core';
import { Observable, of, Subscriber, throwError } from 'rxjs';
declare var Quagga: any;
declare var MediaDevices: any;

@Injectable({
  providedIn: 'root',
})
export class BarcodeService {
  private mediaDevicesSupported: boolean = false;
  private readonly readers = ['code_128_reader', 'ean_reader', 'ean_8_reader'];
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

  initSingle(src: string): Observable<string> {
    return new Observable((subscriber) => {
      Quagga.decodeSingle(
        {
          inputStream: {
            size: 800,
            singleChannel: false,
          },
          locator: {
            patchSize: 'medium',
            halfSample: true,
          },
          decoder: {
            readers: this.readers,
          },
          locate: true,
          src: src,
        },
        (result: any) => {
          if (result?.codeResult?.code) {
            subscriber.next(result.codeResult.code);
            subscriber.complete();
          }
        }
      );
    });
  }

  initStream(selector: string): Observable<string> {
    return new Observable((subscriber) => {
      if (this.mediaDevicesSupported === true) {
        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: document.querySelector(selector),
            },
            decoder: {
              readers: this.readers,
            },
          },
          (err: any) => {
            if (!!err) {
              subscriber.error(err);
            }

            navigator.mediaDevices.enumerateDevices().then(function (devices) {
              devices.forEach(function (device) {
                console.log(
                  device.kind + ': ' + device.label + ' id = ' + device.deviceId
                );
              });
            });

            Quagga.start();
            Quagga.onDetected((data: any) => {
              if (data?.codeResult) {
                console.log('onDetected', data);
                subscriber.next(data.codeResult.code);
                subscriber.complete();
              }
            });
            Quagga.offProcessed((data: any) => {
              console.log('offProcessed', data);
            });
            Quagga.offDetected((data: any) => {
              console.log('offDetected', data);
            });
          }
        );
      } else {
        subscriber.error('Media devices not supported');
      }
    });
  }

  close(selector: string): void {
    Quagga.stop();
  }
}
