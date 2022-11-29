/* Countdown JavaScript Library
 * Author: BIG MOM FAMILY
 * Version: 0.2
 * 
 * Untuk menambahkan komponen countdown ke dalam Document 
 * secara mudah, hanya perlu menginstansiasikan Countdown
 * class dan memanggil method tick() setiap detiknya.
 *
 * Contoh penggunaan terdapat pada file script.js
 * 
 * Untuk mengubah animasi bisa melakukan style overriding
 * pada class CSS ".countdown-animate".
 * 
 * Default animation:
 * @keyframes fadeInAndOut {
 *   0% {opacity: 0;}
 *   20% {opacity: 1;}
 *   60% {opacity: 1;}
 *   80% {opacity: 0.9;}
 *   100% {opacity: 0;}
 * }
 * .countdown-animate {
 *   animation: fadeInAndOut 1s linear;
 * }
 */

class CountdownDigit {
    start = 9;
    end = 0;
    step = -1;
    next = null;
    isDone = false;
    current;

    constructor(start = 9, end = 0, step = -1, current = start, next = null) {
        this.start = Math.floor(start);
        this.end = Math.floor(end);
        this.step = step;
        this.next = next;
        this.current = Math.floor(current);
    }

    set(to) {
        this.current = to;
    }
    get() {
        return this.current;
    }
    tick() {
        var nextCurrent = this.current + this.step;
        if (this.start > this.end) {
            if (nextCurrent < this.end) {
                nextCurrent = this.start;
                if(this.next != null) {
                    this.next.tick();
                } else {
                    this.isDone = true;
                }
            }
        }
        else {
            if (nextCurrent > this.end) {
                nextCurrent = this.start;
                if(this.next != null) {
                    this.next.tick();
                } else {
                    this.isDone = true;
                }
            }
        }
        this.current = nextCurrent;
        return this.get();
    }
    done() {
        return this.isDone;
    }
};

class Countdown {
    prefix;
    final;
    now;

    /*
     * reversed order
     * seconds = [0, 5]; = 50 seconds
     */
    seconds = [0, 0];
    minutes = [0, 0];
    hours = [0, 0];
    days = [0];

    digit = {
        seconds: [],
        minutes: [],
        hours: [],
        days: []
    };

    dom = {
        seconds: [],
        minutes: [],
        hours: [],
        days: []
    };

    isDone = false;
    
    constructor(prefix = "cntd", final = new Date("2022-12-31 23:59:59 GMT+0700")) {
        this.prefix = prefix;
        this.final = final;
        this.now = new Date();

        if(this.final.getTime() < this.now.getTime()) {
            this.isDone = true;
            return;
        }

        // days
        var day = Math.round(this.final.getTime() - this.now.getTime()) / (1000 * 60 * 60 * 24);
        this.days = [];
        while(true) {
            var remainder = day % 10;
            var quotient = Math.floor(day / 10);

            this.days.push(remainder);
            if (quotient <= 0) {
                break;
            }
            day = quotient;
        }

        // days
        var day = Math.round(this.final.getTime() - this.now.getTime()) / (1000 * 60 * 60 * 24);
        this.days = [];
        while(true) {
            var remainder = day % 10;
            var quotient = Math.floor(day / 10);

            this.days.push(remainder);
            if (quotient <= 0) {
                break;
            }
            day = quotient;
        }

        var datediff = new Date(this.final.getTime() - this.now.getTime());
        var hour = datediff.getHours();
        var minute = datediff.getMinutes();
        var second = datediff.getSeconds();

        // hours
        this.hours[0] = hour % 10;
        this.hours[1] = Math.floor(hour / 10);

        // minutes
        this.minutes[0] = minute % 10;
        this.minutes[1] = Math.floor(minute / 10);

        // seconds
        this.seconds[0] = second % 10;
        this.seconds[1] = Math.floor(second / 10);

        // create instance of all digit class
        // days
        var reversedDays = this.days.reverse();
        for (let idx in reversedDays) {
            idx = Number(idx);
            this.digit.days.push(
                new CountdownDigit(9, 0, -1, reversedDays[idx], 
                    ((idx == 0) ? null : this.digit.days[idx-1]))
            );
            this.dom.days.push(
                document.getElementById(this.prefix + '-d-' + (idx + 1))
            );
        }
        var lastIndex = this.dom.days.length;
        while(true) {
            var dom = document.getElementById(this.prefix + '-d-' + (++lastIndex))
            
            if(dom == null) {
                break;
            }
            dom.remove();
        }

        // hours
        // x0
        this.digit.hours.push(
            new CountdownDigit(2, 0, -1, this.hours[1], this.digit.days[this.digit.days.length - 1])
        );
        // 0x
        this.digit.hours.push(
            new CountdownDigit(9, 0, -1, this.hours[0], this.digit.hours[0])
        );
        // dom
        this.dom.hours.push(
            document.getElementById(this.prefix + '-h-' + (1)),
            document.getElementById(this.prefix + '-h-' + (2))
        );

        // minutes
        // x0
        this.digit.minutes.push(
            new CountdownDigit(5, 0, -1, this.minutes[1], this.digit.hours[this.digit.hours.length - 1])
        );
        // 0x
        this.digit.minutes.push(
            new CountdownDigit(9, 0, -1, this.minutes[0], this.digit.minutes[0])
        );
        // dom
        this.dom.minutes.push(
            document.getElementById(this.prefix + '-m-' + (1)),
            document.getElementById(this.prefix + '-m-' + (2))
        );

        // seconds
        // x0
        this.digit.seconds.push(
            new CountdownDigit(5, 0, -1, this.seconds[1], this.digit.minutes[this.digit.minutes.length - 1])
        );
        // 0x
        this.digit.seconds.push(
            new CountdownDigit(9, 0, -1, this.seconds[0], this.digit.seconds[0])
        );
        // dom
        this.dom.seconds.push(
            document.getElementById(this.prefix + '-s-' + (1)),
            document.getElementById(this.prefix + '-s-' + (2))
        );

    }

    tick() {
        this.isDone = this.digit.days[0].done();
        if(!this.isDone) {
            this.digit.seconds[1].tick();
        }
    }

    setDraw(dom, digit) {
        var currentNumber = document.getElementById(dom.id +'-now').innerText;
        var nextNumber = digit.get();
        dom.innerHTML = '';
        if(currentNumber != nextNumber) {
            dom.innerHTML += '<div class="countdown-digit countdown-animate" id="'+ dom.id +'-now">'+nextNumber+'</div>';
        } else {
            dom.innerHTML += '<div class="countdown-digit" id="'+ dom.id +'-now">'+nextNumber+'</div>';
        }
        
    }

    draw() {
        // days
        for (let idx in this.dom.days) {
            idx = Number(idx);
            this.setDraw(this.dom.days[idx], this.digit.days[idx]);
        }
        // hours
        this.setDraw(this.dom.hours[0], this.digit.hours[0]);
        this.setDraw(this.dom.hours[1], this.digit.hours[1]);

        // minutes
        this.setDraw(this.dom.minutes[0], this.digit.minutes[0]);
        this.setDraw(this.dom.minutes[1], this.digit.minutes[1]);

        // seconds
        this.setDraw(this.dom.seconds[0], this.digit.seconds[0]);
        this.setDraw(this.dom.seconds[1], this.digit.seconds[1]);
    }
}