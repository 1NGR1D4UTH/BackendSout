import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { EmployersModule } from './employers/employers.module';
import { CataloguesModule } from './catalogues/catalogues.module';
import { ModelesModule } from './modeles/modeles.module';
import { PrendreMesuresModule } from './prendre-mesures/prendre-mesures.module';
import { MesureHautsModule } from './mesure-hauts/mesure-hauts.module';
import { MesureBassModule } from './mesure-bass/mesure-bass.module';
import { StocksModule } from './stocks/stocks.module';
import { ProduitsModule } from './produits/produits.module';
import { CommandesModule } from './commandes/commandes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, ClientsModule, EmployersModule, CataloguesModule, ModelesModule, PrendreMesuresModule, MesureHautsModule, MesureBassModule, 
    StocksModule, ProduitsModule, CommandesModule,AuthModule],
})
export class AppModule {}
