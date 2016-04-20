/*
 * Description:
 *    Application Main UI
 */
import M = require("ts/views/index/Layouts/Main");
export class AppView extends Marionette.LayoutView<Backbone.Model> {
    private mainRegion: Marionette.Region;

    constructor(options: any = {}) {
        options.el = "#application";
        options.template = false;
        options.regions = {
            mainRegion: "#mainRegion",
        };

        super(options);
        this.showMain();
    }

    public onShow() {
        console.log("Index AppView onShow.");
        this.showMain();
    }

    private showMain(): void {
        this.mainRegion.empty();
        var mainLayout = new M.MainLayout({ model: null });
        this.mainRegion.show(mainLayout);
    }
} 