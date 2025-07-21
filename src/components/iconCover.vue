<script>
import { inject } from 'vue';

export default{
	setup(){
		const dark = inject("dark");
		return{dark}
	},
}
</script>
<template>
    <div class="fontIconNew IC ic1" :class="dark ? 'IC_D' : ''">&#xe908;</div>
    <div class="fontIconNew IC ic2" :class="dark ? 'IC_D' : ''">&#xe909;</div>
    <div class="fontIconNew IC ic3" :class="dark ? 'IC_D' : ''">&#xe99b;</div>
</template>
<style>
.IC{/* icnon cover */
  font-size: 190px;
  position: fixed;
  z-index: -1;
  color:#3b83f688;
}
.IC_D{
	color:#6899c8;
}
.ic1{
  top: 70%;
  left: 3%;
  opacity: .9;
  /* filter:blur(1px); */
  transform: rotate(20deg);
  animation: icon 25s ease-in-out 0s infinite normal none;
}
.ic2{
  bottom: 60%;
  right: 10%;
  opacity: .9;
  /* filter:blur(1px); */
  transform: rotate(50deg);
  animation: rot 30s ease-in-out 0s infinite normal none;
}
.ic3{
  bottom: 60%;
  right: 80%;
  opacity: .9;
  /* filter:blur(1px); */
  font-size: 150px;
  animation: iconCustom 25s ease-in-out 0s infinite normal none;
}

@keyframes icon {
	0%,
	100% {
		transform: translateY(0) rotate(20deg);
	}

	10%,
	30%,
	50%,
	70% {
		transform: translateY(-5px) rotate(20deg);
	}

	20%,
	40%,
	60% {
		transform: translateY(5px) rotate(20deg);
	}

	80% {
		transform: translateY(3.4px) rotate(20deg);
	}

	90% {
		transform: translateY(-3.4px) rotate(20deg);
	}
}
@keyframes iconCustom {
	0%,
	100% {
		transform: translate(0);
	}

	10%,
	30%,
	50%,
	70% {
		transform: translate(-5px);
	}

	20%,
	40%,
	60% {
		transform: translate(5px);
	}

	80% {
		transform: translate(3.4px);
	}

	90% {
		transform: translate(-3.4px);
	}
}

@keyframes rot {
	0%,
	100% {
		transform: rotate(0deg);
		transform-origin: 50% 50%;
	}

	10% {
		transform: rotate(8deg);
	}

	20%,
	40%,
	60% {
		transform: rotate(-10deg);
	}

	30%,
	50%,
	70% {
		transform: rotate(10deg);
	}

	80% {
		transform: rotate(-8deg);
	}

	90% {
		transform: rotate(8deg);
	}
}
@media screen and (max-width:640px) {
	.IC{
		font-size: 150px;
	}
}
</style>