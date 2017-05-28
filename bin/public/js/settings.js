var logSetting = [];

function update_settings(config){
    mining_info_url.val(config['miningInfoUrl'] + ':' + config['miningInfoUrlPort']);
    submission_url.val(config['poolUrl'] + ':' + config['poolUrlPort']);
    wallet_url.val(config['walletUrl'] + ':' + config['walletUrlPort']);

    intensity.val(config['miningIntensity']);
    buffer_size.val(config['bufferSizeMB']);
    plot_readers.val(config['maxPlotReaders']);
    submission_max_retry.val(config['submissionMaxRetry']);
    target_deadline.val(config['targetDeadlineText']);

    timeout.val(config['timeout']);
}

function connectCallback(msg){
    data = msg["data"];

    if (data) {
        if (data == "ping") {
            return;
        }

        var response = JSON.parse(data);

        switch (response["type"]) {
            case "config":
                update_settings(response);
                break;
            default:
                break;
        }
    }
}

window.onload = function(evt) {
    $("#btnSettings").addClass('active');
	logSetting = initSettings($("#settingsDlComboboxes"));

    mining_info_url = $("#mining-info-url");
    submission_url = $("#submission-url");
    wallet_url = $("#wallet-url");

    intensity = $("#intensity");
    buffer_size = $("#buffer-size");
    plot_readers = $("#plot-readers");
    submission_max_retry = $("#submission-max-retry");
    target_deadline = $("#target-deadline");
    timeout = $("#timeout");

    connect(connectCallback);
}