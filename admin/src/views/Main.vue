<template>
  <el-container>

    <el-aside width="200px">
      <el-menu router style="height: 100vh;" :default-active="$route.path" unique-opened>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>图书管理
          </template>
          <el-submenu index="1-1">
            <template slot="title">图书管理</template>
            <el-menu-item index="/book/create"><i class="el-icon-circle-plus"></i>新建图书<i
                class="el-icon-arrow-right"></i> </el-menu-item>
            <el-menu-item index="/book/list"><i class="el-icon-document-copy"></i>图书列表<i
                class="el-icon-arrow-right"></i></el-menu-item>
          </el-submenu>

          <el-submenu index="1-2">
            <template slot="title">分类管理</template>
            <el-menu-item index="/book/categories/create"><i class="el-icon-circle-plus"></i>新建分类<i
                class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="/book/categories/list"><i class="el-icon-document-copy"></i>分类列表<i
                class="el-icon-arrow-right"></i></el-menu-item>
          </el-submenu>

        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>读者管理
          </template>
          <el-submenu index="2-1">
            <template slot="title">读者信息管理</template>
            <el-menu-item index="/user/create"><i class="el-icon-circle-plus"></i>新增读者<i
                class="el-icon-arrow-right"></i> </el-menu-item>
            <el-menu-item index="/user/list"><i class="el-icon-user-solid"></i>读者列表<i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2-2">
            <template slot="title">安全管理</template>
            <el-menu-item index="/user/password"><i class="el-icon-lock"></i>修改密码<i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-data-line"></i>运营管理
          </template>
          <el-submenu index="3-1">
            <template slot="title">广告管理</template>
            <el-menu-item index="/ads/create"><i class="el-icon-circle-plus"></i>新增广告<i class="el-icon-arrow-right"></i>
            </el-menu-item>
            <el-menu-item index="/ads/list"><i class="el-icon-film"></i>广告列表<i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-custom "></i>管理员
          </template>
          <el-menu-item index="/admin_users/create"><i class="el-icon-s-check"></i>新增管理员<i
              class="el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="/admin_users/list"><i class="el-icon-lock"></i>管理员列表<i class="el-icon-arrow-right"></i>
          </el-menu-item>

        </el-submenu>



      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span style="margin-right:15px;font-size:14px;">{{user.username}}</span>
        <el-dropdown id="dropdown" @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"> 设置<i class="el-icon-arrow-down el-icon--right"></i></i>
          <el-dropdown-menu slot="dropdown" @command="handleCommand">
            <el-dropdown-item command="endit">修改个人信息</el-dropdown-item>
            <el-dropdown-item command="password">修改密码</el-dropdown-item>
            <el-dropdown-item command="layout" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


      </el-header>

      <el-main>
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>


<style>
  .el-header {
    /* background-color: #a1ee91; */
    border-bottom: 1px solid #e7e7e7;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  import jwt_decode from 'jwt-decode'
  export default {
    data() {
      return {
        user: {
         
        }
      }
    },
    methods: {
      handleCommand(command) {
        if (command == 'endit') {
          this.editDate()
        } else if (command === 'password') {
          this.editPassword()
        } else if (command == 'layout') {
          this.layout()
        }
      },

      editDate() {
        this.$router.push(`/admin_users/edit/${this.user._id}`)
      },
      editPassword() {
        this.$router.push('/admin_users/password')
      },
      layout() {
        localStorage.clear()
        this.$router.push('/login')
      },
      async fetch() {
        if(localStorage.token){
          const decoded = jwt_decode(localStorage.token);
          this.user.id=decoded.id
          const res = await this.$http.get(`/admin/admin_users/${this.user.id}`)
          this.user = res.data
        } 
      },

    },
    created() {
      this.fetch()
    }
  };
</script>