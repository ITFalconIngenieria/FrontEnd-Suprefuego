import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/core/services/history/history.service';
import { PrimeNGConfig } from 'primeng/api';
import { GetdateService } from 'src/app/core/services/getdate/getdate.service';
import * as moment from 'moment';

@Component({
    selector: 'app-htanque',
    templateUrl: './htanque.component.html',
    styleUrls: ['./htanque.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtanqueComponent implements OnInit {

    basicData: any;
    dataSource: any;
    rangeDates: Date[];
    blockedGraphic: boolean;
    countDate: number;
    globalInterval: string;
    textInterval: string;
    constructor(
        private hosrityS: HistoryService,
        private primengConfig: PrimeNGConfig,
        private dateS: GetdateService,
        private cd: ChangeDetectorRef
    ) {
        this.countDate = 0;
        this.textInterval = '';
        this.globalInterval = 'day';
        this.dataSource = {
            chart: {
                theme: "fusion",
                caption: "Agua",
                subCaption: "2021-01-01 - 2021-07-31",
                xAxisName: "Tiempo",
                yAxisName: "Nivel de tanque",
                palettecolors: "00aeef"
            },
            data: [
                {
                    label: "N/A",
                    value: 0
                }
            ]
        };
        this.primengConfig.ripple = true;
    }

    ngOnInit(): void {

    }

    getDataByDate(dateInterval: string) {
        this.globalInterval = dateInterval;
        this.blockedGraphic = true;
        const { fechaInicio, fechaFin, intervalo, textDate } = this.dateS.getDate(this.globalInterval, this.countDate);
        this.textInterval = textDate;
        this.hosrityS.getHisLectura(fechaInicio, fechaFin, 'motor1/energiaActiva/kWh', intervalo)
            .subscribe(
                (data: []) => {
                    console.log('Getting data');
                    this.readData(data, this.globalInterval)
                        .then(sortedData => this.showGraphic(sortedData))
                        .catch(err => console.error(err));
                },
                (err) => {
                    console.error(err);
                }
            );
    }

    back() {
        this.countDate++;
        this.getDataByDate(this.globalInterval);
    }

    next() {
        this.countDate--;
        this.getDataByDate(this.globalInterval);
    }

    showGraphic(dataSorted) {
        this.dataSource = {
            chart: {
                theme: "fusion",
                subCaption: "2021-01-01 - 2021-07-31",
                xAxisName: "Tiempo",
                yAxisName: "Nivel de tanque",
                palettecolors: "00aeef"
            },
            data: dataSorted
        };
        this.blockedGraphic = false;
        this.cd.detectChanges();
    }

    readData(dataDB: any, interval: string) {
        let newArray = [];
        let dateFormat = '';

        switch (interval) {
            case 'day': 
                dateFormat = 'YYYY-MM-DD HH';
                break;

            case 'month':
                dateFormat = 'YYYY-MM-DD';
                break;

            case 'year':
                dateFormat = 'YYYY-MM';
                break;

            default:
                break;
        }

        return new Promise((resolve, reject) => {
            dataDB.forEach(item => {
                newArray.push({ label: moment(item.datetime).format(dateFormat).toString(), value: item.value });
            });
            newArray ? resolve(newArray) : reject('Error al ordenar datos');
        });
    }

}
