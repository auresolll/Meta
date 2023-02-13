import { Role } from './../enums/role.enum';
import { HasRoles } from './../auth/roles.decorator';
import {
  BadGatewayException,
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { NestCloudinaryClientService } from './cloudinary.service';
import { Images } from './schemas/images.schema';

@Controller('cloudinary')
export class NestCloudinaryClientController {
  constructor(
    private nestCloudinaryClientService: NestCloudinaryClientService,
  ) {}

  @HasRoles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Images> {
    try {
      const singleFile =
        await this.nestCloudinaryClientService.uploadSingleFile(file);
      if (singleFile === undefined)
        throw new BadRequestException('Upload Single File error');
      return singleFile;
    } catch (error) {
      throw error;
    }
  }

  @HasRoles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  @Post('upload/multiple')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadMultipleFiles(
    @UploadedFiles()
    files: Express.Multer.File[],
  ): Promise<Images[]> {
    try {
      const multipleFiles =
        await this.nestCloudinaryClientService.uploadMultipleFile(files);
      if (multipleFiles.length === 0)
        throw new BadGatewayException('Upload Multiple File error');
      return multipleFiles;
    } catch (error) {
      throw error;
    }
  }
}
