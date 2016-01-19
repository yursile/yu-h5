'use strict'

var lessBinDebugOpts = {
        sourceMap: true,
        sourceMapRootpath: '../../'
    },
    debug = {env: 'debug'}

module.exports = function(grunt){
    grunt.initConfig({
        clean: {
            options:{
                force: true
            },
            src: ['src'],
            dist: ['dist']
        },

        uglify:{
            options: {
                mangle: false, //不混淆变量名
                preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                footer:'\n/*!  最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
            },
            dist:{
                files:[
                    {
                        expand:true,
                        cwd:"src/js/",
                        src:['*.js'],
                        dest:"dist/js/",
                        ext:'.min.js'
                    }
                ] 
            }    
        },
       
        less: {
            options:{
                // paths: 'src/less',
                relativeUrls: true
            },
            dist:{  
                files:[
                    {
                        expand:true,
                        cwd:"src/less/",
                        src:['*.less'],
                        dest:"dist/css/",
                        ext:'.css'
                    }
                ] 

            }
        },

        htmlmin:{
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                  {expand: true, cwd: 'src/', src: ['*.html'], dest: 'dist',ext:".html"}
               ]
            }
        },
        cssmin: {
          prod: {
             options: {
               report: 'gzip'
             },
             files: [{
                 expand: true,
                 cwd: 'dist/',
                 src: ['css/*.css'],
                 dest: 'dist/css',
                 ext:".min.css"
                }
             ]
          }
        },
       

        watch: {     
            less: {  
                files: ["src/less/*.less"],  
                tasks: ['less:dist'],  
                options: {  
                    debounceDelay: 250  
                }  
            },
            htmlmin:{
                files:"src/*.html",
                tasks:['htmlmin:html'],
                options: {  
                    debounceDelay: 250  
                } 
            },
            uglify:{
                files:["src/js/*.js"],
                tasks:["uglify"]
            }  
        } 


    });

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    var task = function(){
        var name = this.name
            , tasks = ['clean', 'copy', 'less','uglify']
            , targets = tasks.map(function(v, i, m){
                var target = name === 'debug' && v !== 'less' ? 'bin' : name
                return v + ':' + target
            })
        grunt.task.run(targets)
    }
    grunt.registerTask('bin', task)
    grunt.registerTask('debug', task)
    grunt.registerTask('dist', task)
    grunt.registerTask('min', ['uglify:dist']);
    grunt.registerTask('default',['less','htmlmin','uglify','watch']);
}