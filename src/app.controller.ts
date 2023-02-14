import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import BuildingsDto from './building.dto';
import Building from './building.entity';

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

  @Get('/building')
  async allBuildings() {
    const buildingsRepo = this.dataSource.getRepository(Building);
    return await buildingsRepo.find();
  }

@Post('/building')
async newBuilding(@Body() buildingDto: BuildingsDto) {
  if(!buildingDto.tulajdonos || !buildingDto.alapterulet ||!buildingDto.epiteseve){
    throw new BadRequestException('Minden mezőt kötelező kitölteni');
  }
  if( typeof buildingDto.epiteseve != 'number'){
    throw new BadRequestException('Az építés éve csak egész szám lehet.');
  }
  if( typeof buildingDto.alapterulet != 'number'){
    throw new BadRequestException('Az alapterület csak egész szám lehet.');
  }
    const buildingsRepo = this.dataSource.getRepository(Building);
    const building = new Building();
    building.tulajdonos = buildingDto.tulajdonos;
    building.alapterulet = buildingDto.alapterulet;
    building.epiteseve = buildingDto.epiteseve;
    await buildingsRepo.save(building);

}

  /*
  @Post('/konyv')
  async ujKonyv(@Body() konyv: Konyv) {
    konyv.id = undefined;
    const konyvekRepo = this.dataSource.getRepository(Konyv);
    konyvekRepo.save(konyv)
  }
*/
  @Delete('/building/:id')
  torlesKonyv(@Param('id') id: number) {
  const buildingsRepo = this.dataSource.getRepository(Building);
  buildingsRepo.delete(id)
  }
}
