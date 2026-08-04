import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';

import {
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

import { multerOptions } from '../../common/multer/multer.config';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Files')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'file',
      multerOptions,
    ),
  )
  upload(
    @UploadedFile()
    file: Express.Multer.File,

    @Body()
    dto: CreateFileDto,
  ) {
    return this.fileService.upload(
      dto,
      file,
    );
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOkResponse()
  findAll() {
    return this.fileService.findAll();
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Get(':id')
  @ApiOkResponse()
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.fileService.findOne(id);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Get(':id/download')
  @ApiOkResponse({
    description: 'Download file',
  })
  async download(
    @Param('id')
    id: string,

    @Res()
    res: Response,
  ) {
    const result =
      await this.fileService.download(id);

    return res.download(
      result.filePath,
      result.file.originalName,
    );
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOkResponse()
  remove(
    @Param('id')
    id: string,
  ) {
    return this.fileService.remove(id);
  }
}