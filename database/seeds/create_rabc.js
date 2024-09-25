exports.seed = function (knex) {
    return Promise.all([
        knex('roles').insert([
            { id: 1, slug: 'admin', name: '管理员', description: '拥有全部权限' },
            { id: 2, slug: 'article', name: '文章管理员', description: '拥有查看文章管理的权限' }
        ]),

        knex('permission_groups').insert([
            { id: 1, name: '权限管理' },
            { id: 2, name: '文章管理' }
        ]),

        knex('permissions').insert([
            { id: 1, group_id: 1, slug: 'permissions-setting', name: '权限-设置' },
            { id: 2, group_id: 1, slug: 'role-index', name: '角色-列表' },
            { id: 3, group_id: 1, slug: 'role-create', name: '角色-添加' },
            { id: 4, group_id: 1, slug: 'role-update', name: '角色-编辑' },
            { id: 5, group_id: 1, slug: 'role-delete', name: '角色-删除' },
            { id: 6, group_id: 1, slug: 'role-show', name: '角色-详情' },
            { id: 7, group_id: 1, slug: 'manager-index', name: '管理员-列表' },
            { id: 8, group_id: 1, slug: 'manager-create', name: '管理员-添加' },
            { id: 9, group_id: 1, slug: 'manager-update', name: '管理员-编辑' },
            { id: 10, group_id: 1, slug: 'manager-delete', name: '管理员-删除' },
            { id: 11, group_id: 2, slug: 'article-manage', name: '文章-管理' },
            { id: 12, group_id: 2, slug: 'article-index', name: '文章-列表' },
            { id: 13, group_id: 2, slug: 'article-classify', name: '文章-分类' }
        ]),

        knex('role_permissions').insert([
            { role_id: 1, permission_id: 1 },
            { role_id: 1, permission_id: 2 },
            { role_id: 1, permission_id: 3 },
            { role_id: 1, permission_id: 4 },
            { role_id: 1, permission_id: 5 },
            { role_id: 1, permission_id: 6 },
            { role_id: 1, permission_id: 7 },
            { role_id: 1, permission_id: 8 },
            { role_id: 1, permission_id: 9 },
            { role_id: 1, permission_id: 10 },
            { role_id: 1, permission_id: 11 },
            { role_id: 1, permission_id: 12 },
            { role_id: 1, permission_id: 13 },
            { role_id: 2, permission_id: 10 },
            { role_id: 2, permission_id: 11 },
            { role_id: 2, permission_id: 12 },
            { role_id: 2, permission_id: 13 },
        ]),

        knex('user_roles').insert([
            { user_id: 1, role_id: 1 },
            { user_id: 2, role_id: 2 },
        ])
    ])
}