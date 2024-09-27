import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Patch,
    Post,
    Request,
    Res,
    Session,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Public } from './decorators/public.decorator';
import { AuthUserDto } from './dto/auth-user.dto';
import { Response } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto:AuthUserDto) {
      if (signInDto.email===null) {
        throw new HttpException('Veillez renseigne un email valide', HttpStatus.NOT_ACCEPTABLE)
      }
      if (signInDto.email==="" && !signInDto.email.includes("@") ) {
        throw new HttpException('Veillez renseigne un email valide', HttpStatus.NOT_ACCEPTABLE)
      }
      if (signInDto.password==="") {
        throw new HttpException('Veillez renseigne un password', HttpStatus.NOT_ACCEPTABLE)
      }
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
  
    //ici j'essai de 
    @Get('')
    async getAutSession(
      @Session() session: Record<string, any>
    ){
      console.log(session);
      console.log(session.id);
      session.auth = true;
      return session;
    }


    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    @Public()
    @Patch('resset-password')
    resetPassword(@Body('email') email: string, @Body('return_url') returnUrl: string,  @Res() res: Response) {
      const succes_reset =  this.authService.resetPassword(email, returnUrl)
      if (succes_reset) {
        return res.status(200).json({ message: 'Email sent successfully', success: succes_reset});
      } else {
        return res.status(500).json({ message: 'Unable to send mail' });
      }
      
    }

    @Public()
    @Patch('update-password')
    async updatePassword(@Body('email') email: string, @Body('current_password') current_password: string, @Body('new_password') new_password: string,  @Res() res: Response) {
      // const succesfuly_updated_password =  this.authService.updatePassword(email, current_password, new_password)
      const result = await this.authService.updatePassword(email, current_password, new_password);

      if (result) {
        // return { success: true };
        return res.status(200).json({ message: 'Password updated successfully' });
      } else {
        // return { success: false };
        return res.status(500).json({ message: 'Unable to update password' });
      }
      
    }
  }