import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { FIREBASE } from '../constants';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard(FIREBASE) {}
