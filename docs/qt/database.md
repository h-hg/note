# Win 11 使用 QT 5.15.2 MySQL 插件

## 编译

安装时选择安装 QT 源码，定位 plugin 目录 `C:\Qt\5.15.2\Src\qtbase\src\plugins\sqldrivers`，保守起见，可以对该目录进行备份。

QtCreator 打开 `C:\Qt\5.15.2\Src\qtbase\src\plugins\sqldrivers\mysql\mysql.pro`，环境选择 Mingw81_64。

进行如下修改

```qmake
TARGET = qsqlmysql

HEADERS += $$PWD/qsql_mysql_p.h
SOURCES += $$PWD/qsql_mysql.cpp $$PWD/main.cpp

# 注释如下一行
# QMAKE_USE += mysql

OTHER_FILES += mysql.json

PLUGIN_CLASS_NAME = QMYSQLDriverPlugin
include(../qsqldriverbase.pri)

# 新增如下三行
INCLUDEPATH += "C:/Program Files/MySQL/MySQL Server 9.1/include"
DEPENDPATH += "C:/Program Files/MySQL/MySQL Server 9.1/include"
LIBS += "C:/Program Files/MySQL/MySQL Server 9.1/lib/libmysql.lib"

```

其中 `C:/Program Files/MySQL/MySQL Server 9.1` 为你 MySQL Server 的安装目录。

同时对 `C:\Qt\5.15.2\Src\qtbase\src\plugins\sqldrivers\qsqldriverbase.pri` 进行修改

```qmake
QT  = core core-private sql-private

# For QMAKE_USE in the parent projects.
# 注释如下一行
# include($$shadowed($$PWD)/qtsqldrivers-config.pri)
# 新增如下一行
include(./configure.pri)

PLUGIN_TYPE = sqldrivers
load(qt_plugin)

DEFINES += QT_NO_CAST_TO_ASCII QT_NO_CAST_FROM_ASCII

```

在 QtCreator 选择 Release，然后 Build。

然后会在 `C:\Qt\5.15.2\mingw81_64\qtbase\src\plugins\sqldrivers\mysql\mysql` 产生动态链接库，其中 `C:\Qt\5.15.2\mingw81_64\qtbase` 为新建的目录。

注：如果选择 `MSVC 2019 64` 构建的话，则会 `C:\Qt\5.15.2\msvc2019_64\qtbase\src\plugins\sqldrivers\mysql\mysql` 产生动态连接库，其中 `C:\Qt\5.15.2\msvc2019_64\qtbase` 为新建的目录。

将产生的 `qsqlmysql.dll` 和 `qsqlmysql.dll.debug` 复制到 `C:\Qt\5.15.2\mingw81_64\plugins\sqldrivers` 目录中。

注：如果选择 `MSVC 2019 64`，则将 `qsqlmysqld.pdb`、`qsqlmysql.dll`、`qsqlmysql.pdb` 和 `qsqlmysqld.dll` 复制到 `C:\Qt\5.15.2\msvc2019_64\plugins\sqldrivers`。

## 配置

如果 MySQL Server 以安装形式安装的，则不用 CMakeLists.txt 中添加 libmysql.lib 路径。

```cmake
find_package(Qt${QT_VERSION_MAJOR} REQUIRED COMPONENTS Sql)
target_link_libraries(your_program PRIVATE Qt${QT_VERSION_MAJOR}::Sql)
```

## 其他问题

最后发现，老是爆出如下问题

```text
QSqlDatabase: QMYSQL driver not loaded
QSqlDatabase: available drivers: QSQLITE QMARIADB QMYSQL QMYSQL3 QODBC QODBC3 QPSQL QPSQL7
QSqlDatabase: an instance of QCoreApplication is required for loading driver plugins
```

突然发现有个 github 仓库专门编译好 dll，见 <https://github.com/thecodemonkey86/qt_mysql_driver/releases/tag/qmysql_5.15.2>