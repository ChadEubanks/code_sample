CoreApp.CarouselView = CoreOs.View.extend({
    classNames: ['carousel-view'],
    childViews: ['IndexFrame', 'Toolbar'],

    /**
     * example: [Alto.Object.create({
                view: 'EngageGettingStartedView',
                index: 0
            }), Alto.Object.create({
                view: 'EngagePaymentView',
                index: 1
            })]

     index must start at 0.
     **/

    data: null,

    onscreen: null,

    onscreenNode: null,

    isToolbarVisible: false,

    beforeOnscreenDidChange: Alto.beforeObserver('onscreenNode', function () {
        var node = this.get('onscreenNode');

        node.classList.remove('onscreen');
        node.classList.add('offscreen');
    }),

    onscreenDidChange: Alto.observer('onscreen', function () {
        var node = this.get('onscreenNode'),
            indexList = this.indexFrame.node.children[0].children,
            current = this.get('onscreen');

        node.classList.remove('offscreen');
        node.classList.add('onscreen');

        // update index list view
        for (var i = 0; i < indexList.length; i++) {
            if (i < current.get('index')) {
                indexList[i].className = 'images-oval-med-blue';
            } else if (Alto.isEqual(i, current.get('index'))) {
                indexList[i].className = 'images-oval-med-blue-filled'
            } else {
                indexList[i].className = 'images-oval-sm-grey';
            }
        }
    }),

    viewWillLoad: function () {
        var node = document.createElement('div');

        // let the html element know about the view //
        node.__alto_object__ = this;

        this.viewDidLoad(node);
    },

    viewCreateSubViews: function () {
        var that = this,
            node = this.get('node'),
            data = this.get('data'),
            list = document.createElement('ol'),
            viewInstance;

        list.className = 'carousel-list-view';

        data.forEach(function (obj, idx) {
            var view = obj.get('view'),
                cell = document.createElement('li');

            cell.className = 'carousel-cell';

            if (!Alto.Object.detectInstance(view)) {

                if (Alto.isEqual(view, Alto.String.camelize(view))) {
                    Alto.Logger.warn(Alto.String.fmt('ChildViews are of type \'Class\'. To avoid unwanted side effects. Use a classified syntax for a child\'s name.  Example: \'%@\'.', Alto.String.classify(view)));
                }

                if (Alto.isNone(CoreApp[view])) {
                    Alto.Logger.error('Can not find view: CoreApp.', view)
                    return;
                } else {
                    viewInstance = CoreApp[view].createWithMixins();
                    that[Alto.String.camelize(view)] = viewInstance;
                }
            }

            if (Alto.isEqual(idx, 0)) {
                // sets first obj to current visibility
                cell.classList.add('onscreen');

                that.set('onscreen', obj);
                that.set('onscreenNode', cell);
            } else {
                cell.classList.add('offscreen');
            }

            cell.appendChild(viewInstance.node);
            list.appendChild(cell);

        });

        this._super();

        node.appendChild(list);
    },

    IndexFrame: CoreOs.View.extend({
        classNames: ['index-frame'],
        childViews: ['IndexListView'],

        IndexListView: CoreOs.ListView.extend({
            classNames: ['index-list-view'],
            dataBinding: 'parentView.parentView.data',

            viewCreateSubViews: function () {
                this.get('node').style.width = '%@px'.fmt(this.get('data').length * 22);

                this._super();
            },

            Cell: CoreOs.Cell.extend({
                classNames: ['images-oval-sm-grey'],

                viewDidLoad: function (node) {
                    this._super(node);

                    if (Alto.isEqual(this.get('data.index'), 0)) {
                        node.className = 'images-oval-med-blue-filled'
                    }
                }
            })
        })
    }),

    Toolbar: CoreOs.View.extend({
        classNames: ['carousel-toolbar'],
        childViews: ['Previous', 'Next'],
        isVisibleBinding: 'parentView.isToolbarVisible',

        navigate: function (direction) {
            var that = this,
                current = that.parentView.get('onscreen'),
                data = that.parentView.get('data'),
                carousel = that.parentView.node.children[2].children;

            if (Alto.isEqual(direction, 1)) {
                var index = current.get('index') + 1;

                that.parentView.set('onscreenNode', carousel[index]);
                that.parentView.set('onscreen', data[index]);

            } else if (Alto.isEqual(direction, -1)) {
                var index = current.get('index') - 1;

                that.parentView.set('onscreenNode', carousel[index]);
                that.parentView.set('onscreen', data[index]);
            }

            CoreApp.engageCreateAccountView.contentFrame.node.scrollTop = 0;
        },

        Previous: CoreOs.ButtonView.extend({
            classNames: ['carousel-previous-button'],
            title: 'Prev',

            viewDidLoad: function (node) {
                var that = this;

                node.innerText = this.get('title');
                node.className = this.get('classNames')[0];

                node.addEventListener('click', function () {
                    that.parentView.navigate(-1);
                });

                this.viewWillAppear(node);
            }
        }),

        Next: CoreOs.ButtonView.extend({
            classNames: ['carousel-next-button'],
            title: 'Next',

            viewDidLoad: function (node) {
                var that = this;

                node.innerText = this.get('title');
                node.className = this.get('classNames')[0];

                node.addEventListener('click', function () {
                    that.parentView.navigate(1);
                });

                this.viewWillAppear(node);
            }
        })
    })

})