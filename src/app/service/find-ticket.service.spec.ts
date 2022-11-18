import { TestBed } from '@angular/core/testing';

import { FindTicketService } from './find-ticket.service';

describe('FindTicketService', () => {
  let service: FindTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
