import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';




@Injectable()
export class AuthService {
  constructor(
    
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByUserEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.mail, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user.id  // Ajoutez cette ligne pour inclure l'ID de l'utilisateur
    };
  }

  // Réinitialisation du mot de passe
 async resetPassword(email: string, return_url: string) {

    const user = await this.usersService.findOneByUserEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // On génère un nouveau mot de passe
    const newPassword = this.generateRandomPassword(12);

    console.log('newPassword', newPassword)

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);  // cryptage du mot de passe généré  
    console.log('hashedPassword', hashedPassword)
    // On enregistre le nouveau mot de passe crypté
    await this.prisma.user.update({
      where: { mail: email },
      data: { password: hashedPassword },
    })

    
  }

  //fonction qui permet de modifier le mot de passe d'un utilisateur
  async updatePassword(email: string, current_password: string, new_password: string) {

    const user = await this.usersService.findOneByUserEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const salt = await bcrypt.genSalt();

    console.log("salt", salt)
    console.log("current_password", current_password)

    // Hashage du mot de passe courant
    const hashed_current_password = await bcrypt.hash(current_password, salt);

    console.log("hashed_current_password", hashed_current_password)
    console.log("user.password", user.password)

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      console.log("isMatch", isMatch)
      throw new UnauthorizedException('Invalid credentials');
    }
    // Hashage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(new_password, salt);
    
    try {
      await this.prisma.user.update({
        where: { mail: email },
        data: { password: hashedPassword },
      });
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  }

  // Fonction qui génère un mot de passe aléatoirement
  generateRandomPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }


  
  
}