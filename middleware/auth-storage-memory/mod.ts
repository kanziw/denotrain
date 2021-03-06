import { TicketStorage, User } from "../auth/mod.ts";

export class LocalStorage implements TicketStorage {
  private users: { [ticket: string]: { updated: number; user: User } } = {};
  private lifespan = 24 * 60 * 60 * 1000;

  setTicketLifespan(sec: number): void {
    this.lifespan = sec * 1000;
  }

  async loadTicket(ticket: string): Promise<User | null> {
    if (this.users[ticket]) {
      if (this.users[ticket].updated + this.lifespan < Date.now()) {
        this.invalidateTicket(ticket);
      } else {
        this.users[ticket].updated = Date.now();
        return this.users[ticket].user;
      }
    }
    return null;
  }

  async upsertTicket(ticket: string, user: User): Promise<void> {
    this.users[ticket] = {
      updated: Date.now(),
      user,
    };
  }

  async invalidateTicket(ticket: string): Promise<void> {
    delete this.users[ticket];
  }
}
