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

import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Departments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
  ) {}

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiCreatedResponse({
    description: 'Department created successfully',
  })
  create(
    @Body() dto: CreateDepartmentDto,
  ) {
    return this.departmentService.create(dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get()
  @ApiOkResponse({
    description: 'Get all departments',
  })
  findAll() {
    return this.departmentService.findAll();
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get(':id')
  @ApiOkResponse({
    description: 'Get department by ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.departmentService.findOne(id);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update department',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, dto);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete department',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.departmentService.remove(id);
  }
}