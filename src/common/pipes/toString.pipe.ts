import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class toStringPipe implements PipeTransform<any> {
  async transform(value: any, ArgumentMetadata: ArgumentMetadata) {
    console.log(value, ArgumentMetadata);
    return value;
  }
}
