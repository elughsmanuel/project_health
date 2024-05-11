import { SetMetadata } from '@nestjs/common';
import { VISIBILITY } from './visibility-enum';

export const Public = () => SetMetadata(VISIBILITY.IS_PUBLIC, true);
