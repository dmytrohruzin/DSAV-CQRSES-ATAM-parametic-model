import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserMainProjection } from '../projections/user-main.projection.js'
import { UserPasswordChangedV1 } from '../events/UserPasswordChangedV1.js'

@EventsHandler(UserPasswordChangedV1)
export class UserPasswordChangedEventHandler implements IEventHandler<UserPasswordChangedV1> {
  constructor(private repository: UserMainProjection) {}

  async handle(event: UserPasswordChangedV1) {
    await this.repository.update(event.aggregateId, {
      password: event.password,
      version: event.aggregateVersion
    })
  }
}
