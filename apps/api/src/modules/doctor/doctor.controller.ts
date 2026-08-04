import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
  ) {}

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiCreatedResponse({
    description: 'Doctor created successfully',
  })
  create(
    @Body() dto: CreateDoctorDto,
  ) {
    return this.doctorService.create(dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get()
  @ApiOkResponse({
    description: 'Get all doctors',
  })
  findAll() {
    return this.doctorService.findAll();
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get(':id')
  @ApiOkResponse({
    description: 'Get doctor by ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.doctorService.findOne(id);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update doctor',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(id, dto);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete doctor',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.doctorService.remove(id);
  }
}