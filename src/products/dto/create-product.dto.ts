import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'title can not be blank.' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'description can not be empty.' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'price should not be empty. ' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price should be a number *  max decimal percission 2.' })
    @IsPositive({ message: 'price should be positive number' })
    price: number;

    @IsNotEmpty({ message: 'stock should not be empty.' })
    @IsNumber({}, { message: 'stock should be a number.' })
    @Min(0, { message: 'stock can not be nagative.' })
    stock: number;

    @IsNotEmpty({ message: 'images should not be empty.' })
    @IsArray({ message: 'images should be in array format.' })
    images: string[];

    @IsNotEmpty({ message: 'category should not be empty.' })
    @IsNumber({}, { message: 'category id should be a number.' })
    categoryId: number; // category_id
}
