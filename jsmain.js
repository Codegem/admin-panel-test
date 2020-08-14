console.clear();

function pageTransition() {
	let tl = gsap.timeline({ ease: Expo.easeInOut });

	tl.set(".transition-container span", { pointerEvents: "all" })
		.to("span#from-top", {
			duration: 0.4,
			transformOrigin: "center",
			scaleX: 0,
			right: "0%",
			delay: 0.2,
		})
		.to(
			"span#from-bottom",
			{
				duration: 0.4,
				transformOrigin: "right",
				scaleX: 1.6,
				delay: 0.2,
			},
			"-=0.6"
		);

	tl.to("span#from-top", {
		duration: 0.4,
		transformOrigin: "center",
		scaleX: 0,
		delay: 0.2,
	})
		.to(
			"span#from-bottom",
			{
				duration: 0.4,
				transformOrigin: "right",
				scaleX: 0,
				delay: 0.1,
			},
		)

		.set(".transition-container span", { pointerEvents: "none" });
}

function fadeInContent() {
	let tl = gsap.timeline({ ease: Expo.easeInOut });
	tl.set(".transition-element", {
		left: "10%",
		opacity: 0,
	})

		.to(".transition-element", {
			duration: 0.4,
			left: "100%",
			opacity: 1,
			stagger: 0.1,
		})
}

function fadeOutContent() {
	let tl = gsap.timeline({ ease: Expo.easeInOut });
	tl.to(".transition-element", {
		duration: 0.4,
		left: "5right%",
		opacity: 0,
		stagger: -0.1,
	});
}

barba.init({
	sync: true,

	transitions: [
		{
			async leave() {
				const done = this.async();
				pageTransition();
				fadeOutContent();
				await delay(1200);
				done();
			},
			async enter() {
				fadeInContent();
			},
			async once() {
				fadeInContent();
			},
		},
	],
});

function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}
