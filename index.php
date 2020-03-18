<?PHP include('include.php') ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Arjunane Progress Bar</title>
        <link href="file/arjunane.css?<?PHP echo acak_string() ?>" rel="stylesheet">
        <link href="file/arjunane-pb.css?<?PHP echo acak_string() ?>" rel="stylesheet">
    </head>
    <body>
        <div style="width:500px;margin:auto;padding-top:100px;">

            <div id="mencoba" style="margin-bottom:50px;"></div>

            <div class="strong"></div>

        </div>
        
        <script type="text/javascript" src="file/jquery.js?"></script>
        <script type="text/javascript" src="file/arjunane-pb.js?<?PHP echo acak_string() ?>"></script>
        <script type="text/javascript">
            $('#mencoba').on('click', function(){
                $(this).pb_update({
                    percent: 80,
                    type: 2,
                    information:true,
                    title:'Judul apa saja',
                    info: 'Info apa aja kang wkwkwk mencoba panjang saja wkwkwk',
                    color:'red'
                });
            });
            
            $('.strong').pb({
                percent: 30,
                title:'Judul apa saja',
                info: 'Info apa aja kang wkwkwk mencoba panjang saja wkwkwk'
            });

            $('#mencoba').pb({
                percent: 10,
                information: false,
                type: 2,
                color: '',
            });
        </script>
    </body>
</html