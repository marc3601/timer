class Timer {
    constructor() {
        this.hr = 0
        this.min = 0
        this.sec = 0
        this.secCount
        this.minCount
        this.hrCount
        this.alarmStop

        this.Selectors = {
            hours: '[data-hours]',
            minutes: '[data-minutes]',
            seconds: '[data-seconds]',
            button: '[data-button]',
            buttonStop: '[data-stopbtn]',
            buttonAlarm: '[data-alarm]'
        }
    }

    initializeTimer() {
        this.hours = document.querySelector(this.Selectors.hours)
        this.minutes = document.querySelector(this.Selectors.minutes)
        this.seconds = document.querySelector(this.Selectors.seconds)
        this.button = document.querySelector(this.Selectors.button)
        this.buttonStop = document.querySelector(this.Selectors.buttonStop)
        this.buttonAlarm = document.querySelector(this.Selectors.buttonAlarm)
        this.addEventListeners()
    }

    addEventListeners() {
        this.button.addEventListener('click', () => {
            if (this.hours.value !== "00" || this.minutes.value !== "00" || this.seconds.value !== "00") {
                if (!this.hours.disabled && !this.minutes.disabled && !this.seconds.disabled) {
                    this.startTimer();
                }
            }
        })
        window.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {
                if (this.hours.value !== "00" || this.minutes.value !== "00" || this.seconds.value !== "00") {
                    if (!this.hours.disabled && !this.minutes.disabled && !this.seconds.disabled) {
                        this.startTimer();
                    }
                }
            }
        })

        this.buttonStop.addEventListener('click', () => {
            this.stopTimer();
        })

        this.buttonAlarm.addEventListener('click', () => {

            if (this.sec === 0) {
                this.buttonAlarm.style.opacity = "0"
                this.buttonAlarm.style.animation = "none"
                clearInterval(this.alarmStop)

            }
        })

        this.seconds.addEventListener('keyup', () => {
            this.seconds.value > 0 ? this.sec = this.seconds.value : this.sec = this.seconds.value.replace("-", "")
        })
        this.minutes.addEventListener('keyup', () => {

            this.minutes.value > 0 ? this.min = this.minutes.value : this.min = this.minutes.value.replace("-", "")
        })
        this.hours.addEventListener('keyup', () => {

            this.hr = this.hours.value;

        })
    }

    startTimer() {
        if (this.hr > 0 || this.min > 0 || this.sec > 0) {
            this.hr = parseInt(this.hr);
            this.min = parseInt(this.min);
            this.sec = parseInt(this.sec);
        }
        if (this.sec > 60) {
            this.sec = 59
        }
        if (this.min > 60) {
            this.min = 59
        }
        if (this.hr > 100) {
            this.hr = 99
        }
        this.sec < 10 ? this.seconds.value = "0" + this.sec : this.seconds.value = this.sec
        this.min < 10 ? this.minutes.value = "0" + this.min : this.minutes.value = this.min
        this.hr < 10 ? this.hours.value = "0" + this.hr : this.hours.value = this.hr

        this.hours.disabled = "true";
        this.minutes.disabled = "true";
        this.seconds.disabled = "true";

        this.countSeconds()
        this.countMinutes();
        this.countHours();

    }

    stopTimer() {
        this.hours.removeAttribute('disabled');
        this.minutes.removeAttribute('disabled');
        this.seconds.removeAttribute('disabled');
        clearInterval(this.secCount)
        clearInterval(this.minCount)
        clearInterval(this.hrCount)

    }

    countSeconds() {
        this.secCount = setInterval(() => {
            //SEKUNDY
            this.sec < 10 ? this.seconds.value = "0" + this.sec : this.seconds.value = this.sec
            if (this.sec > 0) {
                this.sec--
            } else if (this.min > 0 && this.sec === 0) {
                this.sec = 59;
            }
            if (this.hours.value === "00" && this.minutes.value === "00" && this.seconds.value === "00") {
                this.stopTimer()
                this.notificationSound();
            }
            if (!this.hr > 0 && !this.min > 0 && this.sec < 5) {
                this.buttonAlarm.style.opacity = "1"
                if (this.sec === 0) return this.buttonAlarm.style.animation = "shake .1s linear infinite alternate"
            }
        }, 1000)

    }

    countMinutes() {
        this.minCount = setInterval(() => {
            // MINUTY
            this.min < 10 ? this.minutes.value = "0" + this.min : this.minutes.value = this.min
            if (this.min > 0 && this.sec === 59) {
                this.min--
            }
        }, 1000)
    }

    countHours() {
        this.hrCount = setInterval(() => {
            // GODZINY
            this.hr < 10 ? this.hours.value = "0" + this.hr : this.hours.value = this.hr
            if (this.hr > 0 && this.min === 0 && this.sec === 0) {
                let current = this.hr
                setTimeout(() => {
                    current === this.hr && this.hr--
                    this.min = 59
                    this.sec = 59
                }, 1000)
            }
        }, 1000)
    }
    playSound() {
        const alarm = new Audio("notification.mp3");
        alarm.play();
    }

    notificationSound() {
        this.playSound();
        this.alarmStop = setInterval(this.playSound, 4000)
    }

}
