<template>
    <div class="mobile">
        <h2>This site does not support mobile. Soz.</h2>
    </div>
</template>

<style lang="stylus">
@media (min-width: 501px)
    .mobile
        display: none

@media (max-width: 500px)
    .mobile
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        display: flex
        align-items: center
        justify-content: center
        background: #363636
        z-index: 3

    h2
        color: #FFFFFF
        width: 90%
</style>
