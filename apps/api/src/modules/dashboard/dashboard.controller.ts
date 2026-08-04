import {
  Controller,
  Get,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Get('admin')
  @ApiOkResponse({
    description: 'Admin dashboard statistics',
  })
  getAdminDashboard() {
    return this.dashboardService.getAdminDashboard();
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Get('doctor/:doctorId')
  @ApiOkResponse({
    description: 'Doctor dashboard statistics',
  })
  getDoctorDashboard(
    @Param('doctorId') doctorId: string,
  ) {
    return this.dashboardService.getDoctorDashboard(
      doctorId,
    );
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.PATIENT,
  )
  @Get('patient/:patientId')
  @ApiOkResponse({
    description: 'Patient dashboard statistics',
  })
  getPatientDashboard(
    @Param('patientId') patientId: string,
  ) {
    return this.dashboardService.getPatientDashboard(
      patientId,
    );
  }
}