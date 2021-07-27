const data =   [
  {
    "id": "9",
    "t_id": "1",
    "q_id": "0",
    "field_id": "2",
    "title": "基本信息",
    "sort": "1",
    "is_show": "1",
    "created_at": "2021-07-19 03:06:53",
    "deleted": "1",
    "is_req": "1",
    "create_edit": "1",
    "up_edit": "1",
    "view_edit": "2",
    "default_mark": "",
    "prompt": "",
    "type": "3",
    "q_type": "1",
    "h5_column": "24",
    "pc_column": "24",
    "trans_key": "基本信息",
    "tbl": "",
    "tbl_val": "",
    "val_json": {
      "min_length": "",
      "max_length": "",
      "limit": ""
    },
    "is_required": "2",
    "drop_source": "",
    "content_value": "",
    "condition_children": [],
    "children": [
      {
        "id": "10",
        "t_id": "1",
        "q_id": "9",
        "field_id": "1",
        "title": "期望城市",
        "sort": "1",
        "is_show": "1",
        "created_at": "2021-07-19 03:06:53",
        "deleted": "1",
        "is_req": "1",
        "create_edit": "1",
        "up_edit": "1",
        "view_edit": "2",
        "default_mark": "",
        "prompt": "",
        "type": "1",
        "q_type": "1",
        "h5_column": "24",
        "pc_column": "24",
        "trans_key": "期望城市",
        "tbl": "hr_resume",
        "tbl_val": "name",
        "val_json": {
          "min_length": "",
          "max_length": "",
          "limit": ""
        },
        "is_required": "2",
        "drop_source": "",
        "content_value": "",
        "condition_children": [],
        "children": []
      },
      {
        "id": "11",
        "t_id": "1",
        "q_id": "9",
        "field_id": "6",
        "title": "岗位类型",
        "sort": "1",
        "is_show": "1",
        "created_at": "2021-07-19 03:06:53",
        "deleted": "1",
        "is_req": "1",
        "create_edit": "1",
        "up_edit": "1",
        "view_edit": "2",
        "default_mark": "",
        "prompt": "",
        "type": "1",
        "q_type": "1",
        "h5_column": "24",
        "pc_column": "24",
        "trans_key": "岗位类型",
        "tbl": "hr_resume",
        "tbl_val": "job_type",
        "val_json": {
          "limit": ""
        },
        "is_required": "2",
        "drop_source": "",
        "content_value": "",
        "condition_children": [],
        "children": []
      },
      {
        "id": "12",                               //主键 id
        "t_id": "1",                              //模板 id
        "q_id": "9",                              //区域 id
        "field_id": "7",                          //模板 id
        "title": "姓名",                          //显示名称
        "sort": "1",                              //排序
        "is_show": "1",                           //是否显示  1 显示 2 隐藏
        "created_at": "2021-07-19 03:06:54",      //创建时间
        "deleted": "1",                           //是否删除 ((前端请忽视))
        "is_req": "1",                            //是否必填 1 必填 2 不必填
        "create_edit": "1",                       //创建时  1 可编辑  2 不可编辑
        "up_edit": "1",                           //修改时  1 可编辑   2 不可编辑
        "view_edit": "2",                         //查看时  1 可编辑  2  不可编辑
        "default_mark": "",                        //默认值
        "prompt": "",                             //提示语
        "type": "1",                              //类型  1 系统字段  2 自定义字段 3 区块  4字段组
        "q_type": "1",                            //字段类型  1 文本  2 下拉  具体看字段列表定义
        "h5_column": "24",                        //h5 显示列
        "pc_column": "24",                        //pc 显示列
        "trans_key": "姓名",                      //翻译key
        "tbl": "hr_resume",                       //表名   (前端请忽视)
        "tbl_val": "name",                        //字段名(字段编码)
        "val_json": {                             //字段限制   具体看字段列表定义
          "min_length": "",
          "max_length": "",
          "limit": ""
        },
        "is_required": "2",                         //字段是否必须代入表单(前端请忽视)
        "drop_source": "",                          //该字段如果是下拉框的话  提供的接口地址
        "content_value": "",                              //字段的内容(值)
        "condition_children": {                       //这里是该字段的验证规则对象
          "template_field_id": "12",                  //这里对应的是该字段的 主键id
          "type": "1",                                //该字段的类型
          "children": [                                 //验证规则对象体
            {
              "id": "3",                                  //验证规则的 id
              "t_id": "1",                                //模板 id
              "template_field_id": "12",                      //这里对应的是该字段的 主键id
              "type": "1",                                    //验证类型 值变化时 1 刷新字段  2 显示/隐藏/必填字段
              "if_type": "1",                                 //验证类型  1 ==> 等于  2 ==>不等于 3 ==>有值
              "val": "1",                                     //值(内容)
              "show_edit": [                                  //显示编辑字段 id(对应的 主键 id)
                "14"
              ],
              "show_read": [                                  //显示只读字段 id(对应的 主键 id)
                ""
              ],
              "hide_field": [                                 //隐藏字段id(对应的 主键 id)
                ""
              ],
              "required_field": [                             //必填字段 id(对应的 主键 id)
                ""
              ],
              "no_required": [                              //非必填字段 id(对应的 主键 id)
                ""
              ],
              "deleted": "1",
            "tbl_val": "name"                                 //对应的字段名称(编码)
            },
            {
              "id": "4",
              "t_id": "1",
              "template_field_id": "12",
              "type": "1",
              "if_type": "1",
              "val": "2",
              "show_edit": [
                "14"
              ],
              "show_read": [
                ""
              ],
              "hide_field": [
                ""
              ],
              "required_field": [
                ""
              ],
              "no_required": [
                ""
              ],
              "deleted": "1",
              "tbl_val": "name"
            }
          ]
        },
        "children": []
      }
    ]
  },
  {
    "id": "13",
    "t_id": "1",
    "q_id": "0",
    "field_id": "5",
    "title": "个人信息",
    "sort": "1",
    "is_show": "1",
    "created_at": "2021-07-19 03:06:54",
    "deleted": "1",
    "is_req": "1",
    "create_edit": "1",
    "up_edit": "1",
    "view_edit": "2",
    "default_mark": "",
    "prompt": "",
    "type": "3",
    "q_type": "1",
    "h5_column": "24",
    "pc_column": "24",
    "trans_key": "个人信息",
    "tbl": "",
    "tbl_val": "",
    "val_json": {
      "min_length": "",
      "max_length": "",
      "limit": ""
    },
    "is_required": "2",
    "drop_source": "",
     "content_value": "",                              //字段的内容(值)
    "condition_children": [],
    "children": [
      {
        "id": "14",
        "t_id": "1",
        "q_id": "13",
        "field_id": "3",
        "title": "性别",
        "sort": "1",
        "is_show": "1",
        "created_at": "2021-07-19 03:06:54",
        "deleted": "1",
        "is_req": "1",
        "create_edit": "1",
        "up_edit": "1",
        "view_edit": "2",
        "default_mark": "",
        "prompt": "",
        "type": "4",
        "q_type": "1",
        "h5_column": "24",
        "pc_column": "24",
        "trans_key": "性别",
        "tbl": "hr_resume",
        "tbl_val": "sex",
        "val_json": {
          "limit": ""
        },
        "is_required": "2",
        "drop_source": "\/custmoize\/getFieldValTypeDetailList",
         "content_value": "",                              //字段的内容(值)
        "condition_children": [],
        "children": [
          {
            "id": "15",
            "t_id": "1",
            "q_id": "14",
            "field_id": "3",
            "title": "性别1",
            "sort": "1",
            "is_show": "1",
            "created_at": "2021-07-19 03:06:54",
            "deleted": "1",
            "is_req": "1",
            "create_edit": "1",
            "up_edit": "1",
            "view_edit": "2",
            "default_mark": "",
            "prompt": "",
            "type": "1",
            "q_type": "1",
            "h5_column": "24",
            "pc_column": "24",
            "trans_key": "性别",
            "tbl": "hr_resume",
            "tbl_val": "sex",
            "val_json": {
              "limit": ""
            },
            "is_required": "2",
            "drop_source": "\/custmoize\/getFieldValTypeDetailList",
             "content_value": "",                              //字段的内容(值)
            "condition_children": [],
            "children": []
          },
          {
            "id": "16",
            "t_id": "1",
            "q_id": "14",
            "field_id": "3",
            "title": "性别2",
            "sort": "1",
            "is_show": "1",
            "created_at": "2021-07-19 03:06:54",
            "deleted": "1",
            "is_req": "1",
            "create_edit": "1",
            "up_edit": "1",
            "view_edit": "2",
            "default_mark": "",
            "prompt": "",
            "type": "1",
            "q_type": "1",
            "h5_column": "24",
            "pc_column": "24",
            "trans_key": "性别",
            "tbl": "hr_resume",
            "tbl_val": "sex",
            "val_json": {
              "limit": ""
            },
            "is_required": "2",
            "drop_source": "\/custmoize\/getFieldValTypeDetailList",
             "content_value": "",                              //字段的内容(值)
            "condition_children": [],
            "children": []
          }
        ]
      }
    ]
  }
]
export default data