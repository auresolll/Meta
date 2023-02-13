import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'nestjs-cloudinary';
import { Images, ImagesDocument } from './schemas/images.schema';

@Injectable()
export class NestCloudinaryClientService {
  constructor(
    @InjectModel(Image.name) private imgModel: Model<ImagesDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createImage(image: {
    name: string;
    type: string;
    url: string;
    create_at: string;
  }): Promise<Images> {
    const { name, type, url, create_at } = image;
    return this.imgModel.create({
      name,
      type,
      url,
      create_at,
    });
  }

  async uploadSingleFile(
    file: Express.Multer.File,
  ): Promise<Images> | undefined {
    const uploadFileSnap = await this.cloudinaryService.uploadFile(file);
    console.log(
      `[NestCloudinaryClientService] uploadFileSnap Code: ${uploadFileSnap.http_code}`,
    );
    if (
      uploadFileSnap.public_id === undefined ||
      uploadFileSnap.public_id === null
    )
      return undefined;
    const newImage = {
      name: uploadFileSnap.name,
      type: uploadFileSnap.type,
      url: uploadFileSnap.secure_url,
      create_at: Date.toString(),
    };
    return await this.createImage(newImage);
  }

  async uploadMultipleFile(files: Express.Multer.File[]): Promise<Images[]> {
    const resultFiles: Images[] = [];
    files.forEach(async (file: Express.Multer.File) => {
      const singleFile = await this.uploadSingleFile(file);
      if (singleFile._id) {
        resultFiles.push(singleFile);
      }
    });
    return resultFiles;
  }
}
