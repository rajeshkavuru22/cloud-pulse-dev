package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.MonitoringService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MonitoringController {

    private final MonitoringService monitoringService;

    public MonitoringController(MonitoringService monitoringService) {
        this.monitoringService = monitoringService;
    }

    @GetMapping("/monitoring/aggregated")
    public List<Object> getAggregatedMonitoringData(
            @RequestParam String projectId,
            @RequestParam String metricType,
            @RequestParam String endTime,
            @RequestParam String startTime,
            @RequestParam String alignmentPeriod,
            @RequestParam String perSeriesAligner) {
        return monitoringService.getAggregatedMonitoringData(projectId, metricType, endTime, startTime, alignmentPeriod, perSeriesAligner);
    }
}

