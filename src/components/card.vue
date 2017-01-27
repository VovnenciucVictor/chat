<script>
import { actions } from '../store';

export default {
    vuex: {
        actions: actions,
        getters: {
            user: ({ user }) => user,
            filterKey: ({ filterKey }) => filterKey
        }
    }
};
</script>

<template>
<div class="card">
    <header>
        <img class="avatar" width="40" height="40" :alt="user.name" :src="user.img">
        <p class="name">{{user.name}}</p>
    </header>
    </br> <hr/> </br>
</div>
</template>

<style scoped lang="less">
.card {
    padding: 12px;
    border-bottom: solid 1px #24272C;

    .avatar, .name {
        vertical-align: middle;
    }
    .avatar {
        border-radius: 2px;
    }
    .name {
        display: inline-block;
        margin: 0 0 0 15px;
        font-size: 16px;
    }
}
</style>