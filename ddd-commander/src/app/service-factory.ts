import { YmlToJsonService } from '../modules/load-data/application/yml-to-json/yml-to-json.service';
import { ReadSkeletonDataService } from '../modules/load-data/application/read-skeleton-data/read-skeleton-data.service';
import { SelectAggregate } from './select-aggregate/select-aggregate';

class ServiceFactory {
  private static instance: ServiceFactory;

  private readonly _ymlToJsonService: YmlToJsonService;
  private readonly _readSkeletonDataService: ReadSkeletonDataService;
  private readonly _selectAggregate: SelectAggregate;

  private constructor() {
    this._ymlToJsonService = new YmlToJsonService();
    this._readSkeletonDataService = new ReadSkeletonDataService();
    this._selectAggregate = new SelectAggregate();
  }

  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  get ymlToJsonService(): YmlToJsonService {
    return this._ymlToJsonService;
  }

  get readSkeletonDataService(): ReadSkeletonDataService {
    return this._readSkeletonDataService;
  }

  get selectAggregate(): SelectAggregate {
    return this._selectAggregate;
  }
}

export const factory = ServiceFactory.getInstance();
