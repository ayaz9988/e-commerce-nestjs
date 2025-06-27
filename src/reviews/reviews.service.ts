import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepo: Repository<ReviewEntity>,
    private readonly productService: ProductsService,
  ) { }
  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
    const product = await this.productService.findOne(createReviewDto.productId);
    let review = await this.findOneByUserAndProduct(currentUser.id, createReviewDto.productId);
    if (!review) {
      review = this.reviewRepo.create(createReviewDto);
      review.addedBy = currentUser;
      review.product = product;
    } else {
      review.comment = createReviewDto.comment;
      review.ratings = createReviewDto.ratings;
    }
    return await this.reviewRepo.save(review);
  }

  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewRepo.find();
  }

  async findAllByProduct(id: number): Promise<ReviewEntity[]> {
    const product = await this.productService.findOne(id);
    if (!product) throw new NotFoundException('product not fouund');
    return await this.reviewRepo.find({
      where: {
        product: {
          id,
        },
      },
      relations: {
        addedBy: true,
        product: {
          category: true,
        }
      }
    });
  }

  async findOne(id: number): Promise<ReviewEntity> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: {
        addedBy: true,
        product: {
          category: true,
        },
      },
    });
    if (!review) throw new NotFoundException('review not found');
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    if (!review) throw new NotFoundException('review not found');
    return this.reviewRepo.remove(review);
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepo.findOne({
      where: {
        addedBy: {
          id: userId,
        },
        product: {
          id: productId,
        },
      },
      relations: {
        addedBy: true,
        product: {
          category: true,
        },
      }
    });
  }
}
