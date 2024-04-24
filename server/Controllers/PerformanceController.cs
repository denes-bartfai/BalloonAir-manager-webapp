using Microsoft.AspNetCore.Mvc;
using server.Model;
using server.Service;

namespace server.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class PerformanceController : ControllerBase
{
    private readonly ILogger<PerformanceController> _logger;
    private readonly IPerformanceRepository _performanceRepository;

    public PerformanceController(ILogger<PerformanceController> logger, IPerformanceRepository performanceRepository)
    {
        _logger = logger;
        _performanceRepository = performanceRepository;
    }
    
    [HttpGet]
    public async Task<ActionResult> GetAllPerformance()
    {
        try
        {
            var performance = await _performanceRepository.GetAll();

            return Ok(performance);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching all performances.");
            return StatusCode(500, "An error occurred while fetching all performances.");
        }
        
    }

    [HttpGet]
    public async Task<ActionResult> GetPerformanceByName(string performanceName)
    {
        try
        {
            var performance = await _performanceRepository.GetByName(performanceName);

            if (performance == null)
            {
                return NotFound($"Performance {performanceName} not found");
            }

            return Ok(performance);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while fetching performance by name: {performanceName}");
            return StatusCode(500, "An error occurred while fetching performance by name.");
        }
    }
    
    [HttpGet]
    public async Task<ActionResult> GetPerformanceById (int performanceId)
    {
        try
        {
            var performance =await _performanceRepository.GetById(performanceId);

            if (performance == null)
            {
                return NotFound($"Performance {performanceId} not found");
            }

            return Ok(performance);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while fetching performance by ID: {performanceId}");
            return StatusCode(500, "An error occurred while fetching performance by ID.");
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddPerformance(PerformanceModel performance)
    {
        try
        {
            if (performance == null)
            {
                return BadRequest($"Please provide valid performance data.");
            }

            await _performanceRepository.Add(performance);
            return CreatedAtAction(nameof(GetPerformanceById), new { performanceId = performance.Id }, performance);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding performance.");
            return StatusCode(500, "An error occurred while adding performance.");
        }
    }

    [HttpDelete]
    public async Task<ActionResult> DeletePerformance(string performanceName)
    {
        try
        {
            var performance = await _performanceRepository.GetByName(performanceName);

            if (performance == null)
            {
                return NotFound($"Performance {performanceName} not found");
            }

            await _performanceRepository.Delete(performance);
            return Ok($"Performance {performanceName} has been deleted.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while deleting performance: {performanceName}");
            return StatusCode(500, "An error occurred while deleting performance.");
        }
    }

    [HttpPatch]
    public async Task<ActionResult> PatchPerformance(int id, PerformanceModel performanceModel)
    {
        try
        {
            var updatedPerformance = await _performanceRepository.Update(id, performanceModel);
            if (updatedPerformance == null)
            {
                return NotFound($"Performance with ID{id} not found");
            }

            return Ok(updatedPerformance);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while updating performance with ID: {id}");
            return StatusCode(500, "An error occurred while updating performance.");
        }
    }
}