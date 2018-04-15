import { Component, Input, OnInit, OnChanges } from "@angular/core";

@Component ({
    selector: 'rs-root',
    templateUrl: './rating.component.html'
})

export class RatingStarsComponent implements OnInit {
    @Input() rating: number;
    starWidth: number;

    ngOnInit(): void {
        this.starWidth = this.rating/5*81;
    }
}