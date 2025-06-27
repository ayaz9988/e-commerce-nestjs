import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: 'reviews' })
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ratings: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    createAt: Timestamp;

    @UpdateDateColumn()
    updateAt: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.reviews)
    addedBy: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.reviews)
    product: ProductEntity;
}
