import {
  isPlatformServer
} from "./chunk-FQGMTIZY.js";
import "./chunk-AGCF4D2E.js";
import {
  ApplicationRef,
  ChangeDetectorRef,
  Directive,
  ErrorHandler,
  Injectable,
  Input,
  NgZone,
  PLATFORM_ID,
  Pipe,
  TemplateRef,
  ViewContainerRef,
  inject,
  setClassMetadata,
  untracked,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-WBEHRU3H.js";
import {
  Observable,
  ReplaySubject,
  Subscription,
  combineLatest,
  distinctUntilChanged,
  from,
  isObservable,
  pipe,
  switchMap,
  tap
} from "./chunk-RSS3ODKE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/@ngrx/component/fesm2022/ngrx-component.mjs
function isNgZone(zone) {
  return zone instanceof NgZone;
}
var _TickScheduler = class _TickScheduler {
};
_TickScheduler.ɵfac = function TickScheduler_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TickScheduler)();
};
_TickScheduler.ɵprov = ɵɵdefineInjectable({
  token: _TickScheduler,
  factory: () => (() => {
    const zone = inject(NgZone);
    return isNgZone(zone) ? new NoopTickScheduler() : inject(ZonelessTickScheduler);
  })(),
  providedIn: "root"
});
var TickScheduler = _TickScheduler;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TickScheduler, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => {
        const zone = inject(NgZone);
        return isNgZone(zone) ? new NoopTickScheduler() : inject(ZonelessTickScheduler);
      }
    }]
  }], null, null);
})();
var _ZonelessTickScheduler = class _ZonelessTickScheduler extends TickScheduler {
  constructor() {
    super(...arguments);
    this.appRef = inject(ApplicationRef);
    this.platformId = inject(PLATFORM_ID);
    this.isServer = isPlatformServer(this.platformId);
    this.scheduleFn = this.isServer ? setTimeout : requestAnimationFrame;
    this.isScheduled = false;
  }
  schedule() {
    if (!this.isScheduled) {
      this.isScheduled = true;
      this.scheduleFn(() => {
        this.appRef.tick();
        this.isScheduled = false;
      });
    }
  }
};
_ZonelessTickScheduler.ɵfac = /* @__PURE__ */ (() => {
  let ɵZonelessTickScheduler_BaseFactory;
  return function ZonelessTickScheduler_Factory(__ngFactoryType__) {
    return (ɵZonelessTickScheduler_BaseFactory || (ɵZonelessTickScheduler_BaseFactory = ɵɵgetInheritedFactory(_ZonelessTickScheduler)))(__ngFactoryType__ || _ZonelessTickScheduler);
  };
})();
_ZonelessTickScheduler.ɵprov = ɵɵdefineInjectable({
  token: _ZonelessTickScheduler,
  factory: _ZonelessTickScheduler.ɵfac,
  providedIn: "root"
});
var ZonelessTickScheduler = _ZonelessTickScheduler;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZonelessTickScheduler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NoopTickScheduler = class extends TickScheduler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  schedule() {
  }
};
var _RenderScheduler = class _RenderScheduler {
  constructor(cdRef, tickScheduler) {
    this.cdRef = cdRef;
    this.tickScheduler = tickScheduler;
  }
  /**
   * Marks component and its ancestors as dirty.
   * It also schedules a new change detection cycle in zone-less mode.
   */
  schedule() {
    this.cdRef.markForCheck();
    this.tickScheduler.schedule();
  }
};
_RenderScheduler.ɵfac = function RenderScheduler_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RenderScheduler)(ɵɵinject(ChangeDetectorRef), ɵɵinject(TickScheduler));
};
_RenderScheduler.ɵprov = ɵɵdefineInjectable({
  token: _RenderScheduler,
  factory: _RenderScheduler.ɵfac
});
var RenderScheduler = _RenderScheduler;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RenderScheduler, [{
    type: Injectable
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: TickScheduler
  }], null);
})();
function createRenderScheduler() {
  return new RenderScheduler(inject(ChangeDetectorRef), inject(TickScheduler));
}
function combineRenderEventHandlers(handlers) {
  return (event) => handlers[event.type]?.(event);
}
function fromPotentialObservable(potentialObservable) {
  if (isObservable(potentialObservable)) {
    return potentialObservable;
  }
  if (isObservableDictionary(potentialObservable)) {
    return combineLatest(toDistinctObsDictionary(potentialObservable));
  }
  if (isPromiseLike(potentialObservable)) {
    return from(potentialObservable);
  }
  return new Observable((subscriber) => {
    subscriber.next(potentialObservable);
  });
}
function isPromiseLike(value) {
  return typeof value?.then === "function";
}
function isObservableDictionary(value) {
  return isDictionary(value) && Object.keys(value).length > 0 && Object.values(value).every(isObservable);
}
function isDictionary(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function toDistinctObsDictionary(obsDictionary) {
  return Object.keys(obsDictionary).reduce((acc, key) => __spreadProps(__spreadValues({}, acc), {
    [key]: obsDictionary[key].pipe(distinctUntilChanged())
  }), {});
}
function createRenderEventManager(handlers) {
  const handleRenderEvent = combineRenderEventHandlers(handlers);
  const potentialObservable$ = new ReplaySubject(1);
  return {
    nextPotentialObservable(potentialObservable) {
      potentialObservable$.next(potentialObservable);
    },
    handlePotentialObservableChanges() {
      return potentialObservable$.pipe(distinctUntilChanged(), switchMapToRenderEvent(), distinctUntilChanged(renderEventComparator), tap(handleRenderEvent));
    }
  };
}
function switchMapToRenderEvent() {
  return pipe(switchMap((potentialObservable) => {
    const observable$ = fromPotentialObservable(potentialObservable);
    let reset = true;
    let synchronous = true;
    return new Observable((subscriber) => {
      const subscription = untracked(() => observable$.subscribe({
        next(value) {
          subscriber.next({
            type: "next",
            value,
            reset,
            synchronous
          });
          reset = false;
        },
        error(error) {
          subscriber.next({
            type: "error",
            error,
            reset,
            synchronous
          });
          reset = false;
        },
        complete() {
          subscriber.next({
            type: "complete",
            reset,
            synchronous
          });
          reset = false;
        }
      }));
      if (reset) {
        subscriber.next({
          type: "suspense",
          reset,
          synchronous: true
        });
        reset = false;
      }
      synchronous = false;
      return subscription;
    });
  }));
}
function renderEventComparator(previous, current) {
  if (previous.type !== current.type || previous.reset !== current.reset) {
    return false;
  }
  if (current.type === "next") {
    return previous.value === current.value;
  }
  if (current.type === "error") {
    return previous.error === current.error;
  }
  return true;
}
var _LetDirective = class _LetDirective {
  set ngrxLet(potentialObservable) {
    this.renderEventManager.nextPotentialObservable(potentialObservable);
  }
  constructor(mainTemplateRef, viewContainerRef, errorHandler, renderScheduler) {
    this.mainTemplateRef = mainTemplateRef;
    this.viewContainerRef = viewContainerRef;
    this.errorHandler = errorHandler;
    this.renderScheduler = renderScheduler;
    this.isMainViewCreated = false;
    this.isSuspenseViewCreated = false;
    this.viewContext = {
      $implicit: void 0,
      ngrxLet: void 0,
      error: void 0,
      complete: false
    };
    this.renderEventManager = createRenderEventManager({
      suspense: () => {
        this.viewContext.$implicit = void 0;
        this.viewContext.ngrxLet = void 0;
        this.viewContext.error = void 0;
        this.viewContext.complete = false;
        this.renderSuspenseView();
      },
      next: (event) => {
        this.viewContext.$implicit = event.value;
        this.viewContext.ngrxLet = event.value;
        if (event.reset) {
          this.viewContext.error = void 0;
          this.viewContext.complete = false;
        }
        this.renderMainView(event.synchronous);
      },
      error: (event) => {
        this.viewContext.error = event.error;
        if (event.reset) {
          this.viewContext.$implicit = void 0;
          this.viewContext.ngrxLet = void 0;
          this.viewContext.complete = false;
        }
        this.renderMainView(event.synchronous);
        this.errorHandler.handleError(event.error);
      },
      complete: (event) => {
        this.viewContext.complete = true;
        if (event.reset) {
          this.viewContext.$implicit = void 0;
          this.viewContext.ngrxLet = void 0;
          this.viewContext.error = void 0;
        }
        this.renderMainView(event.synchronous);
      }
    });
    this.subscription = new Subscription();
  }
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  ngOnInit() {
    this.subscription.add(this.renderEventManager.handlePotentialObservableChanges().subscribe());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  renderMainView(isSyncEvent) {
    if (this.isSuspenseViewCreated) {
      this.isSuspenseViewCreated = false;
      this.viewContainerRef.clear();
    }
    if (!this.isMainViewCreated) {
      this.isMainViewCreated = true;
      this.viewContainerRef.createEmbeddedView(this.mainTemplateRef, this.viewContext);
    }
    if (!isSyncEvent) {
      this.renderScheduler.schedule();
    }
  }
  renderSuspenseView() {
    if (this.isMainViewCreated) {
      this.isMainViewCreated = false;
      this.viewContainerRef.clear();
    }
    if (this.suspenseTemplateRef && !this.isSuspenseViewCreated) {
      this.isSuspenseViewCreated = true;
      this.viewContainerRef.createEmbeddedView(this.suspenseTemplateRef);
    }
  }
};
_LetDirective.ɵfac = function LetDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LetDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ErrorHandler), ɵɵdirectiveInject(RenderScheduler));
};
_LetDirective.ɵdir = ɵɵdefineDirective({
  type: _LetDirective,
  selectors: [["", "ngrxLet", ""]],
  inputs: {
    ngrxLet: "ngrxLet",
    suspenseTemplateRef: [0, "ngrxLetSuspenseTpl", "suspenseTemplateRef"]
  },
  features: [ɵɵProvidersFeature([RenderScheduler])]
});
var LetDirective = _LetDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LetDirective, [{
    type: Directive,
    args: [{
      selector: "[ngrxLet]",
      providers: [RenderScheduler]
    }]
  }], () => [{
    type: TemplateRef
  }, {
    type: ViewContainerRef
  }, {
    type: ErrorHandler
  }, {
    type: RenderScheduler
  }], {
    ngrxLet: [{
      type: Input
    }],
    suspenseTemplateRef: [{
      type: Input,
      args: ["ngrxLetSuspenseTpl"]
    }]
  });
})();
var _PushPipe = class _PushPipe {
  constructor(errorHandler) {
    this.errorHandler = errorHandler;
    this.renderScheduler = createRenderScheduler();
    this.renderEventManager = createRenderEventManager({
      suspense: (event) => this.setRenderedValue(void 0, event.synchronous),
      next: (event) => this.setRenderedValue(event.value, event.synchronous),
      error: (event) => {
        if (event.reset) {
          this.setRenderedValue(void 0, event.synchronous);
        }
        this.errorHandler.handleError(event.error);
      },
      complete: (event) => {
        if (event.reset) {
          this.setRenderedValue(void 0, event.synchronous);
        }
      }
    });
    this.subscription = this.renderEventManager.handlePotentialObservableChanges().subscribe();
  }
  transform(potentialObservable) {
    this.renderEventManager.nextPotentialObservable(potentialObservable);
    return this.renderedValue;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  setRenderedValue(value, isSyncEvent) {
    if (value !== this.renderedValue) {
      this.renderedValue = value;
      if (!isSyncEvent) {
        this.renderScheduler.schedule();
      }
    }
  }
};
_PushPipe.ɵfac = function PushPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PushPipe)(ɵɵdirectiveInject(ErrorHandler, 16));
};
_PushPipe.ɵpipe = ɵɵdefinePipe({
  name: "ngrxPush",
  type: _PushPipe,
  pure: false
});
var PushPipe = _PushPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PushPipe, [{
    type: Pipe,
    args: [{
      name: "ngrxPush",
      pure: false
    }]
  }], () => [{
    type: ErrorHandler
  }], null);
})();
export {
  LetDirective,
  PushPipe,
  RenderScheduler
};
//# sourceMappingURL=@ngrx_component.js.map
