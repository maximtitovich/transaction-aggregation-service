import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  createdAt: Date;

  @Column()
  type: 'earned' | 'spent' | 'payout';

  @Column('decimal')
  amount: number;
}
