import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import KonyvDto from './konyv.dto';
import Konyv from './konyv.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('/konyv')
  async mindenKonyv() {
    const konyvekRepo = this.dataSource.getRepository(Konyv);
    return await konyvekRepo.find();
  }

@Post('/konyv')
async ujKonyv(@Body() konyvDto: KonyvDto) {
  if(!konyvDto.cim || !konyvDto.szerzo ||!konyvDto.hossz){
    throw new BadRequestException('Minden mezőt kötelező kitölteni');
  }
  if( typeof konyvDto.hossz == 'string'){
    throw new BadRequestException('A hossz csak egész szám lehet.');
  }
    const konyvekRepo = this.dataSource.getRepository(Konyv);
    const konyv = new Konyv();
    konyv.szerzo = konyvDto.szerzo;
    konyv.cim = konyvDto.cim;
    konyv.hossz = konyvDto.hossz;
    await konyvekRepo.save(konyv);

}

  /*
  @Post('/konyv')
  async ujKonyv(@Body() konyv: Konyv) {
    konyv.id = undefined;
    const konyvekRepo = this.dataSource.getRepository(Konyv);
    konyvekRepo.save(konyv)
  }
*/
  @Delete('/konyv/:id')
  torlesKonyv(@Param('id') id: number) {
  const konyvekRepo = this.dataSource.getRepository(Konyv);
  konyvekRepo.delete(id)
  }
}
